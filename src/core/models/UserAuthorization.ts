import { UserModel } from './UserModel';

export class UserAuthorizationModel {
  readonly user: UserModel;
  readonly token: string;


  constructor(builder: Required<UserAuthorizationModel>) {
    Object.assign(this, builder);
  }
}
