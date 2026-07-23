import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TASK_PRIORITY, TASK_STATUS } from '../enum/task.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Task description' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: TASK_STATUS.TODO })
  @IsNotEmpty()
  @IsEnum(TASK_STATUS)
  status: string;

  @ApiProperty({ example: TASK_PRIORITY.LOW })
  @IsNotEmpty()
  @IsEnum(TASK_PRIORITY)
  priority: string;
}
