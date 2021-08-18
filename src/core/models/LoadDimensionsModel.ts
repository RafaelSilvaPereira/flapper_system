export class LoadDimensionsModel {
  readonly id?: string;
  readonly weightKG: number;
  readonly heightCM: number;
  readonly widthCM: number;
  readonly dephtCM: number;

  constructor(builder: Required<Omit<LoadDimensionsModel, 'cubageFactor' | 'id'>> | Required<Omit<LoadDimensionsModel, 'cubageFactor'>> ) {
    Object.assign(this, builder);
  }

  get cubageFactor() {
    return 6000;
  }
}
