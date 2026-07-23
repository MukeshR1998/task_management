import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserBaseService } from './common/user.base.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserBaseService],
  exports: [UserBaseService],
})
export class UserModule {}
