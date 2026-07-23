import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RoleBaseService } from './common/role.service';

@Injectable()
export class RoleService {
  constructor(private readonly roleBaseService: RoleBaseService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleBaseService.create(createRoleDto);
  }

  async findAll(): Promise<object> {
    const result = (await this.roleBaseService.find()).result;
    return { result };
  }

  async count(): Promise<number> {
    return await this.roleBaseService.count();
  }

  async findOne(params): Promise<Role> {
    return await this.roleBaseService.findOneOrFail({ where: params });
  }

  async findOneOrFailByRoleName(roleName): Promise<Role> {
    return await this.roleBaseService.findOneOrFail({
      where: { name: roleName },
    });
  }
}
