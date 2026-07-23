import { Role } from '../../entities/role.entity';

export class RoleDto {
  name: string;

  constructor(role: Role) {
    this.name = role.name;
  }
}
