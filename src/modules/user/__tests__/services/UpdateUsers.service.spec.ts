import { CreateUsersService } from '../../services/CreateUsers.service';
import { UpdateUserService } from '../../services/UpdateUsers.service';
import { MOCK_TO_CREATE_USER, MOCK_TO_UPDATE_USER } from '../mocks/users.mock';
import { UserRepositoryFake } from '../repository/User.repository.fake';

let createUserService: CreateUsersService;
let updateUserService: UpdateUserService;
let userRepositoryFake: UserRepositoryFake;

describe('Update User', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    createUserService = new CreateUsersService(userRepositoryFake);
    updateUserService = new UpdateUserService(userRepositoryFake);
  });
  it('should be able to update a user', async () => {
    await createUserService.execute(MOCK_TO_CREATE_USER);
    const userCreated = await userRepositoryFake.findByEmail(
      MOCK_TO_CREATE_USER.email,
    );
    expect(userCreated.name).toEqual('Teste');
    expect(userCreated.lastName).toEqual('LastName');

    const response = await updateUserService.execute(
      userCreated.id,
      MOCK_TO_UPDATE_USER,
    );
    const userUpdated = await userRepositoryFake.findByEmail(userCreated.email);
    expect(userUpdated.name).toEqual('UpdateUser');
    expect(userUpdated.lastName).toEqual('UpdateLastName');
    expect(response).toEqual({ updated: true });
  });

  it('should not be able to update a user with wrong id', async () => {
    try {
      await createUserService.execute(MOCK_TO_CREATE_USER);

      const WRONG_ID = 2;
      await updateUserService.execute(WRONG_ID, MOCK_TO_UPDATE_USER);
    } catch (error) {
      expect(error.message).toBe('BadRequestError: User not exists!');
    }
  });
});
