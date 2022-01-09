/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { PrismaClient } from '@prisma/client';
import { BadRequestError } from 'routing-controllers';
import loginService from '../login/login.service';
import userService from './user.service';
import { iCreatedUser } from './user.types';

const prisma = new PrismaClient();

export const UserRepository = {
  createUser: async ({
    password,
    name,
    last_name,
    email,
  }): Promise<iCreatedUser> => {
    const passwordHash = await userService.createHash(password);
    const data = {
      password: passwordHash,
      name,
      last_name,
      email,
    };

    const user = await prisma.user.create({
      data,
    });

    return user;
  },

  updateUser: async (id, body): Promise<any> => {
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new BadRequestError('User not exists');
    }

    const updateUser = await prisma.user.update({ where: { id }, data: body });

    return updateUser;
  },

  updatePassword: async (id, body): Promise<any> => {
    const { oldPassword, password } = body;

    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new BadRequestError('User not exists');
    }

    const comparePassword = await loginService.compareHash(
      oldPassword,
      userExists.password,
    );

    if (!comparePassword) {
      throw new BadRequestError('Wrong password');
    }

    const createHash = await userService.createHash(password);

    await prisma.user.update({ where: { id }, data: { password: createHash } });

    return true;
  },

  findByEmail: async email => {
    const where = { email };
    const user = await prisma.user.findUnique({ where });
    return user;
  },

  findByToken: async (token: string) => {
    const { id } = await loginService.decodeToken(token);
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  },
};
