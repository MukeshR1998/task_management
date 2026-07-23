import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { BaseServiceInterface } from './baseService.interface';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedData } from '../dto/paginatedData';
import { BaseEntity } from '../entity/baseEntity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityCondition } from '../util/types/entity-condition.type';

export class BaseService<T extends BaseEntity>
  implements BaseServiceInterface<T>
{
  constructor(private genericRepository: Repository<T>) {}

  count(query?: EntityCondition<T>): Promise<number> {
    return this.genericRepository.count(query);
  }

  save(entity: T): Promise<T> {
    return this.genericRepository.save(entity);
  }

  saveList(entities: T[]): Promise<T[]> {
    return this.genericRepository.save(entities);
  }

  delete(query?: FindOptionsWhere<T>) {
    if (!query) {
      throw new Error('Operation failed: query condition is required.');
    }

    return this.genericRepository.delete(query);
  }

  softDelete(query?: FindOptionsWhere<T>) {
    if (!query) {
      throw new Error('Operation failed: query condition is required.');
    }
    return this.genericRepository.softDelete(query);
  }

  findOneOrFail(query?: EntityCondition<T>): Promise<T> {
    if (!query) {
      throw new Error('Operation failed: query condition is required.');
    }
    return this.genericRepository.findOneOrFail(query);
  }

  async findOne(query?: EntityCondition<T>): Promise<T> {
    if (!query) {
      throw new Error('Operation failed: query condition is required.');
    }
    const entity = await this.genericRepository.findOne(query);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  async find(
    query: EntityCondition<T> = {},
    paginationDto: PaginationDto = new PaginationDto(),
  ): Promise<PaginatedData<T>> {
    const { sort } = paginationDto;
    const { select } = query;
    if (select && !select['updatedAt']) {
      select['updatedAt'] = true;
    }
    if (paginationDto?.pagination) {
      const { skip, take } = paginationDto;
      const paginatedData = await this.genericRepository.findAndCount({
        ...query,
        skip,
        take,
        order: sort,
      });
      return new PaginatedData(paginatedData[0], paginatedData[1]);
    }
    const data = await this.genericRepository.find({ ...query, order: sort });
    return new PaginatedData(data, data.length);
  }

  create(data: DeepPartial<T>): Promise<T> {
    return this.genericRepository.save(this.genericRepository.create(data));
  }

  exist(query?: EntityCondition<T>): Promise<boolean> {
    return this.genericRepository.exist(query);
  }

  update(query: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>) {
    return this.genericRepository.update(query, partialEntity);
  }

  findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.genericRepository.findAndCount(options);
  }

  query(query: string): Promise<any> {
    return this.genericRepository.query(query);
  }
}
