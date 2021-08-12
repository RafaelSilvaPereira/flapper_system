export class LoadModel {
  readonly height;
  readonly weight;
  readonly depth;
  readonly cubageFactor;

  constructor(builder: Required<LoadModel>) {
    Object.assign(this, builder);
    
  }
}
