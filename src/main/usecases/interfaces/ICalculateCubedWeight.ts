import { LoadModel } from '../../models/LoadModel';

export abstract class ICalculateCubedWeight {
  abstract call(load: LoadModel): Promise<any>;
}
