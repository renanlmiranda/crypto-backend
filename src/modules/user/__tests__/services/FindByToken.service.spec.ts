import { Users } from '@prisma/client';
import { FindByTokenService } from '../../services/FindByToken.service';
import { CreateUsersService } from '../../services/CreateUsers.service';
import { LoginService } from '../../../login/services/Login.service';
import { MOCK_TO_CREATE_USER } from '../mocks/users.mock';
import { UserRepositoryFake } from '../repository/User.repository.fake';

let createUserService: CreateUsersService;
let loginService: LoginService;
let findByTokeyService: FindByTokenService;
let userRepositoryFake: UserRepositoryFake;

describe('Find by token', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    findByTokeyService = new FindByTokenService(userRepositoryFake);
    loginService = new LoginService(userRepositoryFake);
    createUserService = new CreateUsersService(userRepositoryFake);
  });

  it('should be able to find a user by token', async () => {
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

    const result = await findByTokeyService.execute(login.token);
    expect(result.id).toEqual(1);
    expect(result.name).toEqual('Teste');
    expect(result.email).toEqual('teste@teste.com.br');
  });

  it('should be able to find a user by token', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);
      await userRepositoryFake.findByEmail(MOCK_TO_CREATE_USER.email);

      const WRONG_TOKEN = 'WR0NGT0K3N';

      await findByTokeyService.execute(WRONG_TOKEN);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Wrong token!');
    }
  });
});
