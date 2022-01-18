import { ChangePasswordService } from '../../services/ChangePassword.service';
import { CreateUsersService } from '../../services/CreateUsers.service';
import { MOCK_TO_CREATE_USER } from '../mocks/users.mock';
import { UserRepositoryFake } from '../repository/User.repository.fake';

let changePasswordService: ChangePasswordService;
let createUserService: CreateUsersService;
let userRepositoryFake: UserRepositoryFake;

describe('Update password', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    changePasswordService = new ChangePasswordService(userRepositoryFake);
    createUserService = new CreateUsersService(userRepositoryFake);
  });

  it('should be able to update password', async () => {
    await createUserService.execute(MOCK_TO_CREATE_USER);
    const userCreated = await userRepositoryFake.findByEmail(
      MOCK_TO_CREATE_USER.email,
    );

    const password = 'Teste@123';
    const oldPassword = 'senhaTeste';
    const { id } = userCreated;

    const result = await changePasswordService.execute(id, {
      oldPassword,
      password,
    });

    expect(result).toEqual({ updated: true });
  });

  it('should not be able to update password with wrong user', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);

      const password = 'Teste@123';
      const oldPassword = 'senhaTeste';
      const id = 2;

      await changePasswordService.execute(id, {
        oldPassword,
        password,
      });
    } catch (error) {
      expect(error.message).toBe('BadRequestError: User not exists!');
    }
  });

  it('should not be able to update password with wrong user', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);

      const password = 'Teste@123';
      const oldPassword = 'TesteErrado';
      const id = 1;

      await changePasswordService.execute(id, {
        oldPassword,
        password,
      });
    } catch (error) {
      expect(error.message).toBe('BadRequestError: Wrong password!');
    }
  });
});
