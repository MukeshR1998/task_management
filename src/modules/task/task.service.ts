import { Injectable } from '@nestjs/common';
import { TaskBaseService } from './common/task.base.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskBaseService: TaskBaseService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskBaseService.create(createTaskDto);
  }

  async findAll(
    paginationDto: PaginationDto,
    status?: string,
    priority?: string,
  ) {
    return await this.taskBaseService.find(
      { where: { status, priority } },
      paginationDto,
    );
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskBaseService.findOneOrFail({ where: { id } });
    const data = Object.assign(task, updateTaskDto);

    return await this.taskBaseService.save(data);
  }

  async deleteTask(id: number) {
    return await this.taskBaseService.delete({ id });
  }
}
