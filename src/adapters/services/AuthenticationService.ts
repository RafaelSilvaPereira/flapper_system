import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserByUsernameAndPassword } from '../../core/interfaces/FindUserByUsernameAndPassword';
import { UserCredentialsModel } from '../../core/models/UserCredentialsModel';
import { CreateUser } from '../../core/interfaces/CreateUser';
import { UserModel } from '../../core/models/UserModel';
import { UserAuthorizationModel } from '../../core/models/UserAuthorization';
import { BaseDatabaseModel } from '../../core/models/BaseDatabaseModel';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly findUserByUsernameAndPassword: FindUserByUsernameAndPassword,
    private readonly createUserUsecase: CreateUser,
    private readonly jwtService: JwtService,
  ) {
  }

  async findByUsernameAndPassword(credentials: UserCredentialsModel): Promise<UserModel> {
    return await this.findUserByUsernameAndPassword.call(credentials);
  }


  async create(user: UserCredentialsModel): Promise<BaseDatabaseModel> {
    return await this.createUserUsecase.call(user);
  }


  public async login(credentialsModel: UserCredentialsModel): Promise<UserAuthorizationModel> {
    const userModel = await this.findByUsernameAndPassword(credentialsModel);

    const payload = JSON.stringify(userModel);
    const accessToken = this.jwtService.sign(payload);

    return new UserAuthorizationModel({
      token: accessToken,
      user: userModel,
    });
  }
}
