import { DeepPartial, FindManyOptions } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedData } from '../dto/paginatedData';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityCondition } from '../util/types/entity-condition.type';

export interface BaseServiceInterface<T> {
  save(entity: T): Promise<T>;

  saveList(entities: T[]): Promise<T[]>;

  find(
    query?: EntityCondition<T>,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedData<T>>;

  findOne(query?: EntityCondition<T>): Promise<T>;

  findOneOrFail(query?: EntityCondition<T>): Promise<T>;

  delete(query?: FindOptionsWhere<T>);

  softDelete(query?: FindOptionsWhere<T>);

  count(query?: EntityCondition<T>): Promise<number>;

  create(data: DeepPartial<T>): Promise<T>;

  exist(query?: EntityCondition<T>): Promise<boolean>;

  update(query: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>);

  findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;

  query(query: string): Promise<any>;
}
