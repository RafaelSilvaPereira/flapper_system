import { And, Or, RequiredAllOrOmitId, RequiredAllOrOmitKeys } from '../types/ConstructorsBuildingTypes';

export class LoadDimensionsModel {
  readonly id?: string;
  readonly weightKG: number;
  readonly heightCM: number;
  readonly widthCM: number;
  readonly dephtCM: number;

  constructor(builder: RequiredAllOrOmitKeys<LoadDimensionsModel, 'cubageFactor' | 'id'>) {
    Object.assign(this, builder);
  }

  get cubageFactor() {
    return 6000;
  }
}
