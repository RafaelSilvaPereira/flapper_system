import { EntityModelConverter } from './EntityModelConverter';
import { PositionQuotationEntity } from '../../infra/database/entities/PositionQuotationEntity';
import { PositionQuotationModel } from '../../main/models/PositionQuotationModel';
import { Injectable } from '@nestjs/common';
import { CustomerEntityModelConverter } from './CustomerEntityModelConverter';
import { LoadDimensionsEntityModelConverter } from '../../main/models/LoadDimensionsEntityModelConverter';
import { TransportEntityModelConverter } from './TransportEntityModelConverter';

@Injectable()
export class SavePositionQuotationEntityModelConverter implements EntityModelConverter<PositionQuotationEntity, PositionQuotationModel> {

  constructor(
    private readonly customerEntityModelConverter: CustomerEntityModelConverter,
    private readonly loadDimensionsEntityModelConverter: LoadDimensionsEntityModelConverter,
    private readonly transportEntityModelConverter: TransportEntityModelConverter,
  ) {
  }

  async toEntity(model: PositionQuotationModel): Promise<PositionQuotationEntity> {
    return new PositionQuotationEntity({
      data: {
        load: await this.loadDimensionsEntityModelConverter.toEntity(model.load),
        transport: await this.transportEntityModelConverter.toEntity(model.transport),
        customer: await this.customerEntityModelConverter.toEntity(model.customer),
      },
    });
  }

  async toModel(entity: PositionQuotationEntity): Promise<PositionQuotationModel> {
    return new PositionQuotationModel({
      load: entity.load,
      transport: entity.transport,
      customer: entity.customer
    });
  }

}
