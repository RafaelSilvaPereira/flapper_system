import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { UserModel } from '../models/UserModel';

export abstract class FindUserByUsernameAndPassword {
  abstract call(credentials: UserCredentialsModel): Promise<UserModel>;
}
