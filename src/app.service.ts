import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from './config/config.type';
import { CreateRoleData } from './common/util/db/testData';
import { RoleBaseService } from './modules/role/common/role.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService<AllConfig>,
    private readonly roleBaseService: RoleBaseService,
  ) {}

  async onApplicationBootstrap(): Promise<any> {
    if (
      this.configService.get('app.nodeEnv', { infer: true }) === 'development'
    ) {
      // await new CreateRoleData(this.roleBaseService).createRole();
    }
  }
}
