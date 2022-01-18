/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import tokenService from '../../../utils/token';
import {
  iCreateBody,
  iUsersRepository,
  User,
  iUpdateUser,
  iUserPass,
} from './iUser.repository';
import { prisma } from '../../../database/prisma';

export class UsersRepository implements iUsersRepository {
  async create({
    name,
    lastName,
    email,
    password,
  }: iCreateBody): Promise<User> {
    return prisma.users.create({
      data: { name, lastName, email, password },
    });
  }

  async update(id: number, body: iUpdateUser): Promise<User> {
    return prisma.users.update({ where: { id }, data: body });
  }

  async findOne(id: number): Promise<iUserPass> {
    return prisma.users.findUnique({
      where: { id },
      include: { wallets: true },
    });
  }

  async findByEmail(email: string): Promise<iUserPass> {
    const where = { email };
    const user = await prisma.users.findUnique({ where });
    return user;
  }
}
