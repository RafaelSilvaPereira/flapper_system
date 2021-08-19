import { CreateUserProtocol } from '../../core/protocols/CreateUserProtocol';
import { BaseDatabaseModel } from '../../core/models/BaseDatabaseModel';
import { UserCredentialsModel } from '../../core/models/UserCredentialsModel';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/database/repositories/UserRepository';
import { UserEntityUserCredentialsConverter } from '../converters/UserEntityUserCredentialsConverter';


@Injectable()
export class CreateUserRepositoryConnector implements CreateUserProtocol {

  constructor(
    private readonly userEntityUserCredentialsConverter: UserEntityUserCredentialsConverter,
    private readonly userRepository: UserRepository,
  ) {
  }

  async call(userCredentials: UserCredentialsModel): Promise<BaseDatabaseModel> {

    const existsEntityWithThatUserName = await this.userRepository.findOne({
      where: {
        username: userCredentials.username,
      },
    });

    if (existsEntityWithThatUserName) {
      throw new BadRequestException(`Unable to register, username already in use ${userCredentials.username}`);
    }

    const entity = await this.userRepository.validateAndSave(
      await this.userEntityUserCredentialsConverter.toEntity(userCredentials),
    );

    return new BaseDatabaseModel({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
