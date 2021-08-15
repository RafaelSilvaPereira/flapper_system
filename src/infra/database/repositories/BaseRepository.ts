import { IBaseEntity } from '../entities/IBaseEntity';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';


export abstract class BaseRepository<T extends IBaseEntity> extends Repository<T> {
  async paginate(options: IPaginationOptions, searchOptions?: FindConditions<T> | FindManyOptions<T>): Promise<Pagination<T>> {
    return paginate<T>(this, options);
  }

  private async getLimit(limit: number): Promise<number> {
    return limit > this.getMaxLimit() ? this.getMaxLimit() : limit;
  }

  protected getMaxLimit(): number {
    return 2;
  }


}
