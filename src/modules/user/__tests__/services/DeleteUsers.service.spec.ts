import { CreateUsersService } from '../../services/CreateUsers.service';
import { MOCK_TO_CREATE_USER } from '../mocks/users.mock';
import { UserRepositoryFake } from '../repository/User.repository.fake';
import { DeleteUsersService } from '../../services/DeleteUsers.service';
import { WalletRepositoryFake } from '../../../wallet/__tests__/repository/Wallet.repository.fake';
import { BODY_TO_CREATE_WALLET } from '../../../wallet/__tests__/mocks/wallets.mock';

let createUserService: CreateUsersService;
let deleteUserService: DeleteUsersService;
let userRepositoryFake: UserRepositoryFake;
let walletRepositoryFake: WalletRepositoryFake;

describe('Delete user', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    walletRepositoryFake = new WalletRepositoryFake();
    deleteUserService = new DeleteUsersService(
      userRepositoryFake,
      walletRepositoryFake,
    );
    createUserService = new CreateUsersService(userRepositoryFake);
  });

  it('should be able to delete a user with our wallets', async () => {
    await createUserService.execute(MOCK_TO_CREATE_USER);
    const userCreated = await userRepositoryFake.findByEmail(
      MOCK_TO_CREATE_USER.email,
    );

    await walletRepositoryFake.create(
      { name: 'wallet', description: 'description' },
      userCreated,
    );

    const userDeleted = await deleteUserService.execute(userCreated.id);
    expect(userDeleted).toEqual({ deleted: true });
  });

  it('should not be able to delete a user with our wallets (wrong user id)', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);

      const WRONG_USER_ID = 2;
      const userDeleted = await deleteUserService.execute(WRONG_USER_ID);
      expect(userDeleted).toEqual({ deleted: true });
    } catch (error) {
      expect(error.message).toBe(
        'BadRequestError: User not exists or already deleted!',
      );
    }
  });
});
