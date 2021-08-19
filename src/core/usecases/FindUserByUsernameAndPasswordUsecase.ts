import { FindUserByUsernameAndPasswordProtocol } from '../protocols/FindUserByUsernameAndPasswordProtocol';
import { FindUserByUsernameAndPassword } from '../interfaces/FindUserByUsernameAndPassword';
import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/UserModel';

@Injectable()
export class FindUserByUsernameAndPasswordUsecase implements FindUserByUsernameAndPassword {

  constructor(
    private readonly findUserByUsernameProtocol: FindUserByUsernameAndPasswordProtocol,
  ) {
  }


  async call(credentials: UserCredentialsModel): Promise<UserModel> {
    return this.findUserByUsernameProtocol.call(credentials);
  }

}
