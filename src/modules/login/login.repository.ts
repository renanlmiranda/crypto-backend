/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { UnauthorizedError } from 'routing-controllers';
import loginService from './login.service';
import { UserRepository } from '../user/user.repository';

export const login = async (body): Promise<any> => {
  try {
    const userExists = await UserRepository.findByEmail(body.email);

    if (!userExists) {
      throw new UnauthorizedError('Invalid Credentials');
    }
    const token = await loginService.generateToken(userExists.id);

    const comparePwd = await loginService.compareHash(
      body.password,
      userExists.password,
    );

    if (!comparePwd) {
      throw new UnauthorizedError('Invalid Credintials');
    }

    return { userExists, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
