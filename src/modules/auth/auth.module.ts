import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AllConfig } from 'src/config/config.type';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthBaseService } from './common/auth.base.service';
import { RoleModule } from '../role/role.module';
import { PassportModule } from '@nestjs/passport';
import { EmailStrategy } from './strategy/email.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        secret: configService.get('auth.secret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.expires', { infer: true }),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailStrategy, JwtStrategy, AuthBaseService],
  exports: [AuthService, AuthBaseService],
})
export class AuthModule {}
