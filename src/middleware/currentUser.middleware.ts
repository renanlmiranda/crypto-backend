/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Action } from 'routing-controllers';
import { UserRepository } from '../core/user/user.repository';

export default async (action: Action) => {
  try {
    const token = action.request.headers.authorization;
    const user = await UserRepository.findByToken(token);

    return user;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
