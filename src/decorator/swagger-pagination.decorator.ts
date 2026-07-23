import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function RequireSwaggerPaginationSort() {
  return applyDecorators(
    ApiQuery({ name: 'pagination', required: true, type: Boolean }),
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'size', required: false, type: Number }),
    ApiQuery({ name: 'sort', required: false, type: String }),
  );
}
