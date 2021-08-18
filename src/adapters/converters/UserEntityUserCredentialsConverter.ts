import { EntityModelConverter } from './EntityModelConverter';
import { UserEntity } from '../../infra/database/entities/UserEntity';
import { UserCredentialsModel } from '../../core/models/UserCredentialsModel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserEntityUserCredentialsConverter implements EntityModelConverter<UserEntity, UserCredentialsModel> {
  async toEntity(model: UserCredentialsModel): Promise<UserEntity> {
    return new UserEntity({
      data: {
        username: model.username,
        password: model.password,
        positionQuotations: [],
      },
    });
  }

  async toModel(entity: UserEntity): Promise<UserCredentialsModel> {
    return new UserCredentialsModel({
      username: entity.username,
    });
  }

}
