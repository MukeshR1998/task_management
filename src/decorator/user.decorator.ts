import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../modules/user/entities/user.entity';

export const UserData = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
