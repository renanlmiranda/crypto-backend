/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Action } from 'routing-controllers';
import { container } from 'tsyringe';
import { FindByTokenService } from '../modules/user/services/FindByToken.service';

export default async (action: Action, roles: string[]) => {
  try {
    const findByTokenService = container.resolve(FindByTokenService);
    const token = action.request.headers.authorization;
    const user = await findByTokenService.execute(token);

    !user && false;

    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
