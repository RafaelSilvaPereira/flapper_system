import { EntityRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../entities/CustomerEntity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { BaseRepository } from './BaseRepository';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends BaseRepository<CustomerEntity> {


  async paginate(options: IPaginationOptions, ): Promise<Pagination<CustomerEntity>> {

    return paginate<CustomerEntity>(this, options);
  }
}
