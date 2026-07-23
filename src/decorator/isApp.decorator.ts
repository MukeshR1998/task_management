import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../modules/user/entities/user.entity';

export const IsApp = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request?.isApp;
  },
);
