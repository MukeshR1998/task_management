export class PaginationDto {
  pagination: boolean;
  sort?: object;
  skip?: number;
  take?: number;

  constructor(
    pagination: boolean = false,
    skip: number = 0,
    take: number = 0,
    sort: any = { updatedAt: 'desc' },
  ) {
    this.pagination = pagination;
    this.skip = skip;
    this.take = take;
    this.sort = sort;
  }
}
