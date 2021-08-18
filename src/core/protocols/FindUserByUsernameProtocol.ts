import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { UserModel } from '../models/UserModel';

export abstract class FindUserByUsernameProtocol {
  abstract call(username: UserCredentialsModel): Promise<UserModel>;
}
