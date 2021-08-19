import { Test, TestingModule } from '@nestjs/testing';
import { UserCredentialsModel } from '../../../src/core/models/UserCredentialsModel';
import { FindUserByUsernameAndPasswordProtocol } from '../../../src/core/protocols/FindUserByUsernameAndPasswordProtocol';
import { FindUserByUsernameAndPassword } from '../../../src/core/interfaces/FindUserByUsernameAndPassword';
import { FindUserByUsernameAndPasswordUsecase } from '../../../src/core/usecases/FindUserByUsernameAndPasswordUsecase';
import { UserModel } from '../../../src/core/models/UserModel';


describe('FindUsernameAndPasswordUsecase Test', () => {
  let findUserByUsernameAndPassword: FindUserByUsernameAndPassword;

  const userModel = new UserModel({
    id: '21321',
    username: 'rafael',
  });
  beforeEach(
    async () => {

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: FindUserByUsernameAndPassword,
            useClass: FindUserByUsernameAndPasswordUsecase,
          },
          {
            provide: FindUserByUsernameAndPasswordProtocol,
            useValue: {
              call: jest.fn().mockResolvedValue(userModel),
            },
          },
        ],
      }).compile();

      findUserByUsernameAndPassword = module.get<FindUserByUsernameAndPassword>(FindUserByUsernameAndPassword);
    },
  );

  it('It tests that when the call method of the FindUserByUsernameAndPassword class returns an instance of the UserModel class', async () => {
    const foundUser = await findUserByUsernameAndPassword.call(new UserCredentialsModel({
      username: 'rafael',
      password: '444332211aa',
    }));

    expect(foundUser).toBe(userModel);

  });
});
