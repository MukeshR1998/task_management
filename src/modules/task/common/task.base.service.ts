import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/service/baseService';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskBaseService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }
}
