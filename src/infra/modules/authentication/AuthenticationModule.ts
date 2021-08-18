import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '../../../adapters/services/AuthenticationService';
import { FindUserByUsernameAndPassword } from '../../../core/interfaces/FindUserByUsernameAndPassword';
import { FindUserByUsernameUsecase } from '../../../core/usecases/FindUserByUsernameUsecase';
import { FindUserByUsernameProtocol } from '../../../core/protocols/FindUserByUsernameProtocol';
import { FindUserByUserNameRepositoryConnector } from '../../../adapters/connectors/FindUserByUserNameRepositoryConnector';
import { TypeConvertersModule } from '../features/TypeConvertersModule';
import { CreateUser } from '../../../core/interfaces/CreateUser';
import { CreateUserUsecase } from '../../../core/usecases/CreateUserUsecase';
import { CreateUserProtocol } from '../../../core/protocols/CreateUserProtocol';
import { CreateUserRepositoryConnector } from '../../../adapters/connectors/CreateUserRepositoryConnector';
import { AuthenticationController } from '../../api/controllers/AuthenticationController';
import { UserRepository } from '../../database/repositories/UserRepository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../strategies/JwtStrategy';
import { JwtConstants } from '../../utils/Constrains';


const providers = [
  AuthenticationService,
  JwtStrategy,
  {
    provide: FindUserByUsernameAndPassword,
    useClass: FindUserByUsernameUsecase,
  },
  {
    provide: FindUserByUsernameProtocol,
    useClass: FindUserByUserNameRepositoryConnector,
  },
  {
    provide: CreateUser,
    useClass: CreateUserUsecase,
  },
  {
    provide: CreateUserProtocol,
    useClass: CreateUserRepositoryConnector,
  },
];

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: JwtConstants.SECRET
    }),
    TypeConvertersModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    ...providers,
  ],
})
export class AuthenticationModule {

}
