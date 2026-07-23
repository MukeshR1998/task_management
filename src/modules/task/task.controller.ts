import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SkipAuthCheck } from 'src/decorator/public.decorator';
import { TaskService } from './task.service';
import { Transactional } from 'typeorm-transactional';
import { CreateTaskDto } from './dto/createTask.dto';
import { ResponseDto } from 'src/common/response/response.dto';
import { TASK_PRIORITY, TASK_STATUS } from './enum/task.enum';
import { RequireSwaggerPaginationSort } from 'src/decorator/swagger-pagination.decorator';
import { PaginationSortQuery } from 'src/decorator/pagination.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@ApiTags('Task')
@SkipAuthCheck()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Transactional()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return new ResponseDto(
      await this.taskService.createTask(createTaskDto),
      'Task created successfully',
    );
  }

  @Get('list')
  @ApiOperation({ summary: 'Get List Task' })
  @ApiQuery({ name: 'status', required: false, enum: TASK_STATUS })
  @ApiQuery({ name: 'priority', required: false, enum: TASK_PRIORITY })
  @RequireSwaggerPaginationSort()
  async findListTask(
    @PaginationSortQuery('pagination')
    paginationDto: PaginationDto,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    const result = await this.taskService.findAll(
      paginationDto,
      status,
      priority,
    );

    return new ResponseDto(result, 'Get list task successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Task' })
  @Transactional()
  async updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: number,
  ) {
    return new ResponseDto(
      await this.taskService.updateTask(id, updateTaskDto),
      'Task updated successfully',
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Task' })
  @Transactional()
  async deleteTask(@Param('id') id: number) {
    return new ResponseDto(
      await this.taskService.deleteTask(id),
      'Task deleted successfully',
    );
  }
}
