import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entity/baseEntity';
import { ROLE_NAME } from '../enum/role.enum';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: ROLE_NAME.USER,
    unique: true,
  })
  name: string;
}
