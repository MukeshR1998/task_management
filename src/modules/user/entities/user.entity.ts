import { BaseEntity } from 'src/common/entity/baseEntity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { REGISTER_TYPE } from '../enum/user.enum';
import { Exclude } from 'class-transformer';
import { UserUtil } from '../common/user.util';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ default: REGISTER_TYPE.EMAIL })
  registerType: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @ManyToOne(() => Role, { nullable: false })
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  async setFullName() {
    this.fullName = `${this.firstName} ${
      this.middleName ? this.middleName + ' ' : ''
    }${this.lastName}`;
  }

  @BeforeInsert()
  async setPassword() {
    if (this.password) {
      this.password = await UserUtil.hashPassword(this.password);
    }
  }
}
