/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Action } from 'routing-controllers';
import { findByToken } from '../core/user/user.repository';

export default async (action: Action, roles: string[]) => {
  try {
    const token = action.request.headers.authorization;
    const user = await findByToken(token);

    !user && false;

    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
