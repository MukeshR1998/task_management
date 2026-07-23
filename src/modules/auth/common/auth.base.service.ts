import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/modules/websocket/common/types';

@Injectable()
export class AuthBaseService {
  constructor(private jwtService: JwtService) {}

  generateToken(userId) {
    return this.jwtService.signAsync({ userId });
  }

  verifyTokenForChatSystem(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
