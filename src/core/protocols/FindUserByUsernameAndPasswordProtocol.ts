import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { UserModel } from '../models/UserModel';

export abstract class FindUserByUsernameAndPasswordProtocol {
  abstract call(username: UserCredentialsModel): Promise<UserModel>;
}
