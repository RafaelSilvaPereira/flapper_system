import { EntityModelConverter } from './EntityModelConverter';
import { PositionQuotationEntity } from '../../infra/database/entities/PositionQuotationEntity';
import { PositionQuotationModel } from '../../core/models/PositionQuotationModel';
import { Injectable } from '@nestjs/common';
import { CustomerEntityModelConverter } from './CustomerEntityModelConverter';
import { LoadDimensionsEntityModelConverter } from './LoadDimensionsEntityModelConverter';
import { TransportEntityModelConverter } from './TransportEntityModelConverter';
import { UserEntity } from '../../infra/database/entities/UserEntity';

@Injectable()
export class PositionQuotationEntityModelConverter implements EntityModelConverter<PositionQuotationEntity, PositionQuotationModel> {

  constructor(
    private readonly customerEntityModelConverter: CustomerEntityModelConverter,
    private readonly loadDimensionsEntityModelConverter: LoadDimensionsEntityModelConverter,
    private readonly transportEntityModelConverter: TransportEntityModelConverter,
  ) {
  }

  async toEntity(model: PositionQuotationModel): Promise<PositionQuotationEntity> {
    const positionQuotationEntity: UserEntity = <UserEntity>{ id: model.createdById };
    return new PositionQuotationEntity({
      data: {
        load: await this.loadDimensionsEntityModelConverter.toEntity(model.load),
        transport: await this.transportEntityModelConverter.toEntity(model.transport),
        customer: await this.customerEntityModelConverter.toEntity(model.customer),
        createdBy: positionQuotationEntity,
      },
    });
  }

  async toModel(entity: PositionQuotationEntity): Promise<PositionQuotationModel> {

    return new PositionQuotationModel({
      id: entity.id,
      load: await this.loadDimensionsEntityModelConverter.toModel(entity.load),
      transport: await this.transportEntityModelConverter.toModel(entity.transport),
      customer: await this.customerEntityModelConverter.toModel(entity.customer),
      createdById: entity.createdBy.id,
    });
  }

}
