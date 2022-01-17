import { container } from 'tsyringe';
import { iUsersRepository } from '../../modules/user/repository/iUser.repository';
import { UsersRepository } from '../../modules/user/repository/User.repository';

container.registerSingleton<iUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
