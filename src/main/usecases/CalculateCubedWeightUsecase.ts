import { CalculateCubedWeight } from '../interfaces/CalculateCubedWeight';
import { LoadModel } from '../models/LoadModel';
import { CubageWeightModel } from '../models/CubageWeightModel';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CalculateCubedWeightUsecase implements CalculateCubedWeight {

  async calculate(load: LoadModel): Promise<CubageWeightModel> {

    const cubicCm = load.weight * load.height * load.depth;
    return new CubageWeightModel({
      value: cubicCm / load.cubageFactor,
    });
  }

}
