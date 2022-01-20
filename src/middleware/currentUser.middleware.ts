/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Action } from 'routing-controllers';
import { UsersRepository } from '../modules/user/repository/User.repository';
import { FindByTokenService } from '../modules/user/services/FindByToken.service';

const usersRepository = new UsersRepository();
const findByTokenService = new FindByTokenService(usersRepository);

export default async (action: Action) => {
  try {
    const token = action.request.headers.authorization;
    const user = await findByTokenService.execute(token);

    return user;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
