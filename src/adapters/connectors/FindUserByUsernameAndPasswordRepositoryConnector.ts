import { FindUserByUsernameAndPasswordProtocol } from '../../core/protocols/FindUserByUsernameAndPasswordProtocol';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCredentialsModel } from '../../core/models/UserCredentialsModel';
import { UserRepository } from '../../infra/database/repositories/UserRepository';
import { UserModel } from '../../core/models/UserModel';

@Injectable()
export class FindUserByUsernameAndPasswordRepositoryConnector implements FindUserByUsernameAndPasswordProtocol {

  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  async call(credentialsModel: UserCredentialsModel): Promise<UserModel> {
    const entity = await this.userRepository.findOne({
      select: ['id', 'username', 'password'],
      where: {
        username: credentialsModel.username,
        password: credentialsModel.password,
      },
    });

    if (entity) {
      return new UserModel({
        id: entity.id,
        username: entity.username,
      });
    }
    throw new BadRequestException('Credentials are not valid');
  }

}
