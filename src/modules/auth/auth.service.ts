import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthBaseService } from './common/auth.base.service';
import { UserBaseService } from '../user/common/user.base.service';
import { CreateUserDto } from './dto/createUser.dto';
import { RoleBaseService } from '../role/common/role.service';
import { ROLE_NAME } from '../role/enum/role.enum';
import { UserUtil } from '../user/common/user.util';
import { User } from '../user/entities/user.entity';
import { UserLoginDto } from './dto/user.login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private authBaseService: AuthBaseService,
    private userBaseService: UserBaseService,
    private readonly roleBaseService: RoleBaseService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.role = await this.roleBaseService.findOneOrFail({
      where: { name: ROLE_NAME.USER },
    });
    return await this.userBaseService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userBaseService.findOneOrFail({
      where: { email },
      relations: { role: true },
    });

    const passwordMatched = await UserUtil.comparePassword(
      password,
      user.password,
    );

    if (!passwordMatched) return null;

    return user;
  }

  async login(user: User) {
    const token = await this.authBaseService.generateToken(user.userId);
    return new UserLoginDto(user, token);
  }

  async isExist(phoneNumber?: string, email?: string) {
    return await this.userBaseService.exist({ where: { phoneNumber, email } });
  }

  async generateToken() {
    const id = uuidv4();

    const token = await this.authBaseService.generateToken(id);
    return token;
  }
}
