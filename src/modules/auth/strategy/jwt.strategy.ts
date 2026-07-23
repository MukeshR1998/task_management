import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserBaseService } from 'src/modules/user/common/user.base.service';
import { AllConfig } from 'src/config/config.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<AllConfig>,
    private userBaseService: UserBaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  public async validate(payload: any) {
    const user = await this.userBaseService.findOne({
      where: { userId: payload.userId },
      relations: {
        role: true,
      },
    });
    if (!user)
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );

    //roles for acl
    // return { ...user, roles: user.role.name };
    return user;
  }
}
