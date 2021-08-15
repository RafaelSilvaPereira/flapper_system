import { LoadModel } from '../models/LoadModel';
import { CubageWeightModel } from '../models/CubageWeightModel';

export abstract class CalculateCubedWeight {
  abstract calculate(load: LoadModel): Promise<CubageWeightModel>;
}
