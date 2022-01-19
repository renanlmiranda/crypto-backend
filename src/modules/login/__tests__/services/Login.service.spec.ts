import { CreateUsersService } from '../../../user/services/CreateUsers.service';
import { MOCK_TO_CREATE_USER } from '../../../user/__tests__/mocks/users.mock';
import { UserRepositoryFake } from '../../../user/__tests__/repository/User.repository.fake';
import { LoginService } from '../../services/Login.service';

let userRepositoryFake: UserRepositoryFake;
let createUserService: CreateUsersService;
let loginService: LoginService;

describe('Login', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    loginService = new LoginService(userRepositoryFake);
    createUserService = new CreateUsersService(userRepositoryFake);
  });

  it('should be able to login with a valid user', async () => {
    await createUserService.execute(MOCK_TO_CREATE_USER);
    const userCreated = await userRepositoryFake.findByEmail(
      MOCK_TO_CREATE_USER.email,
    );

    const body = {
      email: userCreated.email,
      password: MOCK_TO_CREATE_USER.password,
    };

    const login = await loginService.execute(body);
    expect(login.user.name).toEqual('Teste');
    expect(login.user.email).toEqual('teste@teste.com.br');
  });

  it('should not be able to login with a invalid user', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);

      const body = {
        email: 'invalid@invalid.com.br',
        password: MOCK_TO_CREATE_USER.password,
      };

      await loginService.execute(body);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Login invalid!');
    }
  });

  it('should not be able to login with a invalid user', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);
      const userCreated = await userRepositoryFake.findByEmail(
        MOCK_TO_CREATE_USER.email,
      );

      const body = {
        email: userCreated.email,
        password: 'invalidPassword',
      };

      await loginService.execute(body);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Invalid Credintials!');
    }
  });
});
