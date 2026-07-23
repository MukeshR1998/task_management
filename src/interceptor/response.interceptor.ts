import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../common/response/response.dto';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from 'src/config/config.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService<AllConfig>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseData: ResponseDto) => {
        const status = context.switchToHttp().getResponse().statusCode;
        const timestamp = new Date().toISOString();

        return {
          status,
          timestamp,
          message: responseData?.message,
          data: responseData?.data,
          // imageBasePath: this.configService.get('aws.s3BasePath', {
          //   infer: true,
          // }),
        };
      }),
    );
  }
}
