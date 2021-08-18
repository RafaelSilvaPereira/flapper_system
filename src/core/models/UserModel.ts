export class UserModel {
  readonly id?: string;
  readonly username: string;
  readonly password?: string;

  constructor(builder: Partial<UserModel>) {
    Object.assign(this, builder);
  }
}
