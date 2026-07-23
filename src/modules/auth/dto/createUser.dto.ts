import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Role } from 'src/modules/role/entities/role.entity';
import { GENDER, REGISTER_TYPE } from 'src/modules/user/enum/user.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(REGISTER_TYPE)
  registerType: string;

  @ApiProperty()
  @ValidateIf((item) => item.registerType == REGISTER_TYPE.EMAIL)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @ValidateIf((item) => item.registerType == REGISTER_TYPE.MOBILE_NUMBER)
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  profileImage: string;

  @ApiHideProperty()
  role: Role;
}
