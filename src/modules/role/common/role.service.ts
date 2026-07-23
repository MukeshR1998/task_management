import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/service/baseService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleBaseService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
