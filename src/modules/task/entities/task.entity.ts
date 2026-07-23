import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TASK_PRIORITY, TASK_STATUS } from '../enum/task.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Index()
  @Column({ type: 'varchar', nullable: true, default: TASK_STATUS.TODO })
  status: string;

  @Index()
  @Column({ type: 'varchar', nullable: true, default: TASK_PRIORITY.LOW })
  priority: string;
}
