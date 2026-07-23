import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../common/response/response.dto';
import { Transactional } from 'typeorm-transactional';
import { SkipAuthCheck } from 'src/decorator/public.decorator';

@ApiTags('Roles')
@SkipAuthCheck()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Post()
  // @Transactional()
  // async create(@Body() createRoleDto: CreateRoleDto) {
  //   return new ResponseDto(
  //     await this.roleService.create(createRoleDto),
  //     'Role Create Success',
  //   );
  // }

  // @Get()
  // async findAll() {
  //   return new ResponseDto(await this.roleService.findAll());
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return new ResponseDto(await this.roleService.findOne(+id));
  // }
}
