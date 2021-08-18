import { Injectable } from '@nestjs/common';
import {
  CustomerRepository,
  LoadDimensionsRepository,
  PositionQuotationRepository,
  TransportRepository,
} from '../../infra/database/repositories/exports.repositories';


@Injectable()
export class AppService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly loadDimensionsRepository: LoadDimensionsRepository,
    private readonly positionQuotationRepository: PositionQuotationRepository,
    private readonly transportRepository: TransportRepository,
  ) {

  }

  private async extracted()  {
    const customerEntityPagination = await this.customerRepository.paginate({
      page: 2,
      limit: 2,
    });

  }

  getHello(): string {
    return 'Hello World!';
  }
}
