import { CalculateCubedWeight } from '../interfaces/CalculateCubedWeight';
import { CubageWeightModel } from '../models/CubageWeightModel';
import { Injectable } from '@nestjs/common';
import { LoadDimensionsModel } from '../models/LoadDimensionsModel';


@Injectable()
export class CalculateCubedWeightUsecase implements CalculateCubedWeight {

  async calculate(load: LoadDimensionsModel): Promise<CubageWeightModel> {

    const cubicCm = load.weightKG * load.heightCM * load.dephtCM;
    return new CubageWeightModel({
      value: cubicCm / load.cubageFactor,
    });
  }

}
