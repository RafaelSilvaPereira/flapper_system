import { CreateUserProtocol } from '../../../src/core/protocols/CreateUserProtocol';
import { CreateUserRepositoryConnector } from '../../../src/adapters/connectors/CreateUserRepositoryConnector';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityUserCredentialsConverter } from '../../../src/adapters/converters/UserEntityUserCredentialsConverter';
import { UserRepository } from '../../../src/infra/database/repositories/UserRepository';
import { UserCredentialsModel } from '../../../src/core/models/UserCredentialsModel';
import { UserEntity } from '../../../src/infra/database/entities/UserEntity';
import { BaseDatabaseModel } from '../../../src/core/models/BaseDatabaseModel';

describe('CreateUserRepositoryConnector Test', () => {

  let createUser: CreateUserProtocol;
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
            provide: CreateUserProtocol,
            useClass: CreateUserRepositoryConnector,
          },
          {
            provide: UserEntityUserCredentialsConverter,
            useValue: {
              toEntity: jest.fn().mockResolvedValue(new UserEntity({
                data: {
                  username: 'rafael',
                  password: 'password',
                },
              })),
            },
          },
          UserRepository,
        ],
      }).compile();

      createUser = module.get<CreateUserProtocol>(CreateUserProtocol);
      userRepository = module.get<UserRepository>(UserRepository);

      jest.spyOn(userRepository, 'validateAndSave').mockResolvedValue(expectedUserEntity);
    });


  const userCredentialsModel = new UserCredentialsModel({
    username: 'rafael',
    password: 'password',
  });
  it('It tests that the call method of the Create User Repository Connector class returns an instance of the BaseDataBaseModel class, when an exception of the BadRequestException type is not generated, because it is a not duplicate user name', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const savedUser = await createUser.call(userCredentialsModel);

    const expectedResponse = new BaseDatabaseModel({
      id: '123',
      updatedAt: new Date('Aug 9, 1995'),
      createdAt: new Date('Aug 9, 1995'),
    });

    expect(savedUser).toEqual(expectedResponse);
  });

  it('It tests that the call method of the Create User Repository Connector throw a BadRequestException, when an exception of the BadRequestException type is generated, because it is a duplicate user name', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUserEntity);


    const expectedResponse = new BaseDatabaseModel({
      id: '123',
      updatedAt: new Date('Aug 9, 1995'),
      createdAt: new Date('Aug 9, 1995'),
    });

    await expect(createUser.call(userCredentialsModel)).rejects.toThrow('Unable to register, username already in use rafael');
  });
});
