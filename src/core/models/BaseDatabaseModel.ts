export class BaseDatabaseModel {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(builder: Required<BaseDatabaseModel>) {
    Object.assign(this, builder);
  }
}
