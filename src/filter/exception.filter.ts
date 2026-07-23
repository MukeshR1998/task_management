import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CannotCreateEntityIdMapError } from 'typeorm/error/CannotCreateEntityIdMapError';
import { Request, Response } from 'express';
import { AxiosError } from 'axios';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let message = (exception as any)?.message || 'Error Occurred';
    let stack = (exception as any)?.stack;
    let status = (exception as any)?.status || 500;

    switch (exception?.constructor) {
      case UnauthorizedException:
        status = (exception as UnauthorizedException).getStatus();
        message = (exception as UnauthorizedException).message;
        stack = (exception as UnauthorizedException).stack;
        break;

      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        stack = (exception as HttpException).stack;
        break;

      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        stack = (exception as any).stack;
        break;

      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        // message = (exception as EntityNotFoundError).message;
        message = 'Requested Data not Found. Try Again';
        stack = (exception as any).stack;
        break;

      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        stack = (exception as any).stack;
        break;

      case BadRequestException:
        status = (exception as BadRequestException).getStatus();
        message = (exception as any).getResponse().message;
        stack = (exception as BadRequestException).stack;
        break;

      case AxiosError: {
        const axiosErr = exception as AxiosError;
        status = axiosErr?.response?.status || HttpStatus.BAD_GATEWAY;
        message = axiosErr?.response?.data || axiosErr.message;
        stack = axiosErr?.stack;
        break;
      }

      default:
        break;
    }

    Logger.error(message, stack, `${request.method} ${request.url}`);

    if (typeof message === 'object' && message?.message) {
      message = message?.message;
    }

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      message,
      stack,
    });
  }
}
