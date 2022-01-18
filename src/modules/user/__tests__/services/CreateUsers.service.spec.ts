import { CreateUsersService } from '../../services/CreateUsers.service';
import {
  MOCK_TO_CREATE_USER,
  MOCK_TO_CREATE_USER_WITHOUT_EMAIL,
  MOCK_TO_CREATE_USER_WITHOUT_PASSWORD,
} from '../mocks/users.mock';
import { UserRepositoryFake } from '../repository/User.repository.fake';

let createUserService: CreateUsersService;
let userRepositoryFake: UserRepositoryFake;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    createUserService = new CreateUsersService(userRepositoryFake);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute(MOCK_TO_CREATE_USER);
    const userCreated = await userRepositoryFake.findByEmail(
      MOCK_TO_CREATE_USER.email,
    );

    expect(user).toEqual({ created: true });
    expect(userCreated.email).toEqual('teste@teste.com.br');
  });

  it('should not be able to create a user with a duplicate email', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);
      await createUserService.execute(MOCK_TO_CREATE_USER);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Email already exists!');
    }
  });

  it('should not be able to create a user without password', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER_WITHOUT_PASSWORD);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Data is not correct!');
    }
  });

  it('should not be able to create a user without email', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER_WITHOUT_EMAIL);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Data is not correct!');
    }
  });
});
