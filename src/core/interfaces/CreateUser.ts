import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { BaseDatabaseModel } from '../models/BaseDatabaseModel';


export abstract class CreateUser {
  abstract call(userCredentials: UserCredentialsModel): Promise<BaseDatabaseModel>;
}
