import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export const PaginationSortQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const pagination = query.pagination === 'true' ? true : false;
    const page = query.page ? parseInt(query.page) : 1;
    const size = query.size ? parseInt(query.size) : 10;
    //convert [] into {}

    const sortList = query.sort
      ? query.sort.split(',')
      : 'updatedAt,desc'.split(',');
    const sort = {};
    if (sortList.length == 2) {
      sort[sortList[0]] = sortList[1];
    } else {
      throw new BadRequestException('Error in sort parameter');
    }

    if (!pagination) {
      return { pagination, sort };
    }

    return new PaginationDto(pagination, (page - 1) * size, size, sort);
  },
);

export interface IPaginationSort {
  pagination: boolean;
  page?: number;
  size?: number;
  sort?: object;
  skip?: number;
  take?: number;
}
