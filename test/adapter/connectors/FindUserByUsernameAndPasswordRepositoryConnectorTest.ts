import { FindUserByUsernameAndPasswordProtocol } from '../../../src/core/protocols/FindUserByUsernameAndPasswordProtocol';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../src/infra/database/repositories/UserRepository';
import { UserCredentialsModel } from '../../../src/core/models/UserCredentialsModel';
import { UserEntity } from '../../../src/infra/database/entities/UserEntity';
import { FindUserByUsernameAndPasswordRepositoryConnector } from '../../../src/adapters/connectors/FindUserByUsernameAndPasswordRepositoryConnector';
import { UserModel } from '../../../src/core/models/UserModel';

describe('CreateUserRepositoryConnector Test', () => {

  let findUserByUsernameAndPassword: FindUserByUsernameAndPasswordProtocol;
  let userRepository: UserRepository;
  const expectedUserEntity = new UserEntity({
    generalData: {
      id: '123',
      updatedAt: new Date('Aug 9, 1995'),
      createdAt: new Date('Aug 9, 1995'),
    },
    data: {
      username: 'rafael',
    },
  });
  beforeEach(
    async () => {

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: FindUserByUsernameAndPasswordProtocol,
            useClass: FindUserByUsernameAndPasswordRepositoryConnector,
          },
          UserRepository,
        ],
      }).compile();

      findUserByUsernameAndPassword = module.get<FindUserByUsernameAndPasswordProtocol>(FindUserByUsernameAndPasswordProtocol);
      userRepository = module.get<UserRepository>(UserRepository);
    });


  const userCredentialsModel = new UserCredentialsModel({
    username: 'rafael',
    password: 'password',
  });
  it('Tests that the FindUserByUsernameAndPassword method returns an instance of UserModel when userRepository.findOne returns a UserEntity', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(new UserEntity({
      data: {
        username: 'rafael',
      },
    }));

    const foundedUserModel = await findUserByUsernameAndPassword.call(userCredentialsModel);

    const expectedResponse = new UserModel({
      username: 'rafael',
    });

    expect(foundedUserModel).toEqual(expectedResponse);
  });
  it('Tests that the FindUserByUsernameAndPassword throws a BadRequestException when userRepository.findOne returns null or undefined', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const expectedResponse = new UserModel({
      username: 'rafael',
    });

    await expect(findUserByUsernameAndPassword.call(userCredentialsModel))
      .rejects
      .toThrow('Credentials are not valid');
  });
});
