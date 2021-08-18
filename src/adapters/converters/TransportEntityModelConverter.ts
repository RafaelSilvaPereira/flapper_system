import { EntityModelConverter } from './EntityModelConverter';
import { TransportEntity } from '../../infra/database/entities/TransportEntity';
import { TransportModel } from '../../core/models/TransportModel';
import { Injectable } from '@nestjs/common';


@Injectable()
export class TransportEntityModelConverter implements EntityModelConverter<TransportEntity, TransportModel> {
  async toEntity(model: TransportModel): Promise<TransportEntity> {
    const { destinationCity, id, originCity } = model;
    return new TransportEntity({
      generalData: {
        id: id,
      },
      data: {
        destinationCity: destinationCity,
        originCity: originCity,
      },
    });
  }

  async toModel(entity: TransportEntity): Promise<TransportModel> {
    const { destinationCity, id, originCity } = entity;
    return new TransportModel({
      id: id,
      originCity: originCity,
      destinationCity: destinationCity,
    });
  }

}
