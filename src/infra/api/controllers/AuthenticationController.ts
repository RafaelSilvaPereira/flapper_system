import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from '../../../adapters/services/AuthenticationService';
import { UserCredentialsModel } from '../../../core/models/UserCredentialsModel';
import { BaseDatabaseModel } from '../../../core/models/BaseDatabaseModel';
import { UserAuthorizationModel } from '../../../core/models/UserAuthorization';
import { PasswordEncryptInterceptor } from '../../interceptors /PasswordEncryptInterceptor';

@Controller('auth')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {
  }

  @Post('create')
  @UseInterceptors(PasswordEncryptInterceptor)
  async create(@Body() userCredentialsModel: UserCredentialsModel): Promise<BaseDatabaseModel> {

    return this.authenticationService.create(userCredentialsModel);
  }

  // $2b$10$tsuF4kmqf4P9iZcAJsRwnuoChVKukwPJeqpE4jOxl6fRyoNb/Q2NG
  //
  @Post('login')
  @UseInterceptors(PasswordEncryptInterceptor)
  async login(@Body() userCredentialsModel: UserCredentialsModel): Promise<UserAuthorizationModel> {

    const userAuthorizationModel = await this.authenticationService.login(userCredentialsModel);

    return userAuthorizationModel;
  }
}
