import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { BaseDatabaseModel } from '../models/BaseDatabaseModel';


export abstract class CreateUserProtocol {
  abstract call(userCredentials: UserCredentialsModel): Promise<BaseDatabaseModel>;
}
