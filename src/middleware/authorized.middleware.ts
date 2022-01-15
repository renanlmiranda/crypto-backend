/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Action } from 'routing-controllers';
import { UsersRepository } from '../modules/user/repository/User.repository';

const usersRepository = new UsersRepository();

export default async (action: Action, roles: string[]) => {
  try {
    const token = action.request.headers.authorization;
    const user = await usersRepository.findByToken(token);

    !user && false;

    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
