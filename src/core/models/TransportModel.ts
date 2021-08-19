import { RequiredAllOrOmitId } from '../types/ConstructorsBuildingTypes';

export class TransportModel {
  readonly id?: string;
  readonly destinationCity: string;
  readonly originCity: string;

  constructor(builder: RequiredAllOrOmitId<TransportModel>) {
    Object.assign(this, builder);
  }


}
