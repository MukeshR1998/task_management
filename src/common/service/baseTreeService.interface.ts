import { FindTreeOptions } from 'typeorm';
import { BaseServiceInterface } from './baseService.interface';

export interface BaseTreeServiceInterface<T> extends BaseServiceInterface<T> {
  findTrees(options?: FindTreeOptions): Promise<T[]>;
  findDescendantsTree(entity: T, options?: FindTreeOptions): Promise<T>;
  findAncestorsTree(entity: T, options?: FindTreeOptions): Promise<T>;
}
