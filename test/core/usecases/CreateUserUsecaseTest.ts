import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from '../../../src/core/interfaces/CreateUser';
import { CreateUserUsecase } from '../../../src/core/usecases/CreateUserUsecase';
import { CreateUserProtocol } from '../../../src/core/protocols/CreateUserProtocol';
import { BaseDatabaseModel } from '../../../src/core/models/BaseDatabaseModel';
import { UserCredentialsModel } from '../../../src/core/models/UserCredentialsModel';

describe('CreateUser Test', () => {
  let createUser: CreateUser;

  const baseDatabaseModel = new BaseDatabaseModel({
    id: '1',
    updatedAt: new Date(),
    createdAt: new Date(),
  });
  beforeEach(
    async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: CreateUser,
            useClass: CreateUserUsecase,
          },
          {
            provide: CreateUserProtocol,
            useValue: {
              call: jest.fn().mockResolvedValue(baseDatabaseModel),
            },
          },
        ],
      }).compile();

      createUser = module.get<CreateUser>(CreateUser);
    },
  );

  it('It tests that when the CreateUser class\'s call method returns an instance of the BaseDatabaseModel class', async () => {
    const createdUser = await createUser.call(new UserCredentialsModel({
      username: 'rafael123',
      password: '444332211aa',
    }));

    expect(createdUser).toBe(baseDatabaseModel);

  });
});
