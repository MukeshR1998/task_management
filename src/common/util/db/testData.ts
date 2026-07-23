import { Logger } from '@nestjs/common';
import { RoleBaseService } from 'src/modules/role/common/role.service';
import { CreateRoleDto } from 'src/modules/role/dto/create-role.dto';
import { ROLE_NAME } from 'src/modules/role/enum/role.enum';

export class CreateRoleData {
  constructor(private readonly roleBaseService: RoleBaseService) {}

  async createRole() {
    const roleCount = await this.roleBaseService.count();

    if (roleCount <= 0) {
      for (const role in ROLE_NAME) {
        await this.roleBaseService.create(new CreateRoleDto(role));
      }

      Logger.debug('Role Created Successfully');
    }
  }
}
