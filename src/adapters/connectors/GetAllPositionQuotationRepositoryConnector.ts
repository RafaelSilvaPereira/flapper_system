import { GetAllPositionQuotationProtocol } from '../../core/protocols/GetAllPositionQuotationProtocol';
import { Injectable } from '@nestjs/common';
import { PositionQuotationRepository } from '../../infra/database/repositories/PositionQuotationRepository';
import { PositionQuotationModel } from '../../core/models/PositionQuotationModel';
import { PositionQuotationEntityModelConverter } from '../converters/PositionQuotationEntityModelConverter';

@Injectable()
export class GetAllPositionQuotationRepositoryConnector implements GetAllPositionQuotationProtocol {

  constructor(
    private readonly positionQuotationRepository: PositionQuotationRepository,
    private readonly positionQuotationEntityModelConverter: PositionQuotationEntityModelConverter,
  ) {
  }

  async call(): Promise<PositionQuotationModel[]> {
    const positionQuotationEntities = await this.positionQuotationRepository.find();


    return await Promise.all(
      positionQuotationEntities.map((entity) => this.positionQuotationEntityModelConverter.toModel(entity)),
    );
  }

}
