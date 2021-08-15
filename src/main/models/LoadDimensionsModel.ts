export class LoadDimensionsModel {
  readonly id: string;
  readonly weightKG: number;
  readonly heightCM: number;
  readonly widthCM: number;
  readonly dephtCM: number;

  constructor(builder: Required<LoadDimensionsModel>) {
    Object.assign(this, builder);
  }
}
