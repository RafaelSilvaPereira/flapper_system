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

  getHello(): string {
    return 'Hello World!';
  }

  private async extracted() {
    const customerEntityPagination = await this.customerRepository.paginate({
      page: 2,
      limit: 2,
    });

  }
}
