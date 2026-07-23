import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuthCheck } from 'src/decorator/public.decorator';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/common/response/response.dto';

@SkipAuthCheck()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  // @Transactional()
  // async signUp(@Body() createUserDto: CreateUserDto) {
  //   await this.authService.createUser(createUserDto);
  //   return new ResponseDto(null, 'User successfully registered');
  // }

  // @Post('login/email')
  // @UseGuards(EmailAuthGuard)
  // @ApiBody({ type: LoginAuthDto })
  // @Transactional()
  // async loginWithEmail(@Request() req) {
  //   return new ResponseDto(
  //     await this.authService.login(req.user),
  //     'Login successful',
  //   );
  // }

  // @Get('isExist')
  // @ApiQuery({ name: 'phoneNumber', required: false, type: String })
  // @ApiQuery({ name: 'email', required: false, type: String })
  // async exist(
  //   @Query('phoneNumber') phoneNumber?: string,
  //   @Query('email') email?: string,
  // ) {
  //   return new ResponseDto(
  //     await this.authService.isExist(phoneNumber, email),
  //     'Data is available',
  //   );
  // }

  @Post('generate/token')
  async generateToken() {
    return new ResponseDto(await this.authService.generateToken());
  }
}
