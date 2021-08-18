import { FindUserByUsernameProtocol } from '../protocols/FindUserByUsernameProtocol';
import { FindUserByUsernameAndPassword } from '../interfaces/FindUserByUsernameAndPassword';
import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/UserModel';

@Injectable()
export class FindUserByUsernameUsecase implements FindUserByUsernameAndPassword {

  constructor(
    private readonly findUserByUsernameProtocol: FindUserByUsernameProtocol,
  ) {
  }


  async call(credentials: UserCredentialsModel): Promise<UserModel> {
    return this.findUserByUsernameProtocol.call(credentials);
  }

}
