import { CreateUsersService } from '../../services/CreateUsers.service';
import { UserRepositoryFake } from '../repository/User.repository.fake';

let createUserService: CreateUsersService;
let userRepositoryFake: UserRepositoryFake;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    createUserService = new CreateUsersService(userRepositoryFake);
  });
  it('should be able to create a new user', () => {});
});
