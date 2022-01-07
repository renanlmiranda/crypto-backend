/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { UnauthorizedError } from 'routing-controllers';
import loginService from './login.service';
import { findByEmail } from '../user/user.repository';

export const login = async (body): Promise<any> => {
  try {
    const userExists = await findByEmail(body.email);

    const comparePwd = await loginService.compareHash(
      body.password,
      userExists.password,
    );

    if (!userExists || !comparePwd) {
      throw new UnauthorizedError('Invalid Credintials');
    }

    return comparePwd;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
