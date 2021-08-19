import { GetCurrentUserPositionQuotationsProtocol } from '../../core/protocols/GetCurrentUserPositionQuotationsProtocol';
import { PositionQuotationModel } from '../../core/models/PositionQuotationModel';
import { PositionQuotationRepository } from '../../infra/database/repositories/PositionQuotationRepository';
import { PositionQuotationEntityModelConverter } from '../converters/PositionQuotationEntityModelConverter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCurrentUserPositionQuotationsRepositoryConnector implements GetCurrentUserPositionQuotationsProtocol {

  constructor(
    private readonly positionQuotationRepository: PositionQuotationRepository,
    private readonly positionQuotationEntityModelConverter: PositionQuotationEntityModelConverter,
  ) {
  }

  async call(currentUserId: string): Promise<PositionQuotationModel[]> {
    const userPositionQuotationsEntities = await this.positionQuotationRepository.find({
      where: {
        createdBy: currentUserId,
      },
    });

    return Promise.all(userPositionQuotationsEntities.map((entity) => this.positionQuotationEntityModelConverter.toModel(entity)));
  }

}
