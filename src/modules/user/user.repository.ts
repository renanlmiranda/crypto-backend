/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { BadRequestError } from 'routing-controllers';
import loginService from '../login/login.service';
import userService from './user.service';
import { iCreatedUser } from './user.types';
import { prisma } from '../../database/prisma';

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

    const user = await prisma.users.create({
      data,
    });

    return user;
  },

  updateUser: async (id, body): Promise<any> => {
    const userExists = await prisma.users.findUnique({ where: { id } });

    if (!userExists) {
      throw new BadRequestError('User not exists');
    }

    const updateUser = await prisma.users.update({ where: { id }, data: body });

    return updateUser;
  },

  updatePassword: async (id, body): Promise<any> => {
    const { oldPassword, password } = body;

    const userExists = await prisma.users.findUnique({ where: { id } });

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

    await prisma.users.update({
      where: { id },
      data: { password: createHash },
    });

    return true;
  },

  findOne: async (id: number) =>
    prisma.users.findUnique({ where: { id }, include: { wallets: true } }),

  findByEmail: async email => {
    const where = { email };
    const user = await prisma.users.findUnique({ where });
    return user;
  },

  findByToken: async (token: string) => {
    const { id } = await loginService.decodeToken(token);
    const user = await prisma.users.findUnique({ where: { id } });
    return user;
  },
};
