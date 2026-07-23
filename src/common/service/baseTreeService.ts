import { FindTreeOptions, TreeRepository } from 'typeorm';
import { BaseEntity } from '../entity/baseEntity';
import { BaseTreeServiceInterface } from './baseTreeService.interface';
import { BaseService } from './baseService';

export class BaseTreeService<T extends BaseEntity>
  extends BaseService<T>
  implements BaseTreeServiceInterface<T>
{
  constructor(private genericTreeRepository: TreeRepository<T>) {
    super(genericTreeRepository);
  }

  findTrees(options?: FindTreeOptions): Promise<T[]> {
    return this.genericTreeRepository.findTrees(options);
  }

  findDescendantsTree(entity: T, options?: FindTreeOptions): Promise<T> {
    return this.genericTreeRepository.findDescendantsTree(entity, options);
  }

  findAncestorsTree(entity: T, options?: FindTreeOptions): Promise<T> {
    return this.genericTreeRepository.findAncestorsTree(entity, options);
  }
}
