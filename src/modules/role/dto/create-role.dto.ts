import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE_NAME } from '../enum/role.enum';

export class CreateRoleDto {
  @ApiProperty({ enum: ROLE_NAME, default: ROLE_NAME.USER })
  @IsNotEmpty()
  @IsEnum(ROLE_NAME)
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
