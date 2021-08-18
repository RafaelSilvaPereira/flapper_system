import { UserCredentialsModel } from '../models/UserCredentialsModel';
import { BaseDatabaseModel } from '../models/BaseDatabaseModel';
import { CreateUser } from '../interfaces/CreateUser';
import { Injectable } from '@nestjs/common';
import { CreateUserProtocol } from '../protocols/CreateUserProtocol';

@Injectable()
export class CreateUserUsecase implements CreateUser {
  constructor(
    private readonly createUserProtocol: CreateUserProtocol,
  ) {
  }

  async call(userCredentials: UserCredentialsModel): Promise<BaseDatabaseModel> {
    return this.createUserProtocol.call(userCredentials);
  }
}
