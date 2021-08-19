import { CubageWeightModel } from '../models/CubageWeightModel';
import { LoadDimensionsModel } from '../models/LoadDimensionsModel';

export abstract class CalculateCubedWeight {
  abstract calculate(load: LoadDimensionsModel): Promise<CubageWeightModel>;
}
