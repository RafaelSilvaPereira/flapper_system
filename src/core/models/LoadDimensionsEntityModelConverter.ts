import { EntityModelConverter } from '../../adapters/converters/EntityModelConverter';
import { LoadDimensionsEntity } from '../../infra/database/entities/LoadDimensionsEntity';
import { LoadDimensionsModel } from './LoadDimensionsModel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadDimensionsEntityModelConverter implements EntityModelConverter<LoadDimensionsEntity, LoadDimensionsModel> {
  async toEntity(model: LoadDimensionsModel): Promise<LoadDimensionsEntity> {
    const { dephtCM, heightCM, id, weightKG, widthCM } = model;
    return new LoadDimensionsEntity({
      data: {
        weightKG: weightKG,
        widthCM: widthCM,
        dephtCM: dephtCM,
        heightCM: heightCM,
      },
      generalData: {
        id: id,
      },
    });
  }

  async toModel(entity: LoadDimensionsEntity): Promise<LoadDimensionsModel> {
    const { dephtCM, heightCM, id, weightKG, widthCM } = entity;
    return new LoadDimensionsModel({
      id: id,
      dephtCM: dephtCM,
      widthCM: widthCM,
      heightCM: heightCM,
      weightKG: weightKG,
    });
  }

}
