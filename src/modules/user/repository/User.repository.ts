/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { BadRequestError } from 'routing-controllers';
import loginService from '../../login/login.service';
import {
  iCreateBody,
  iUserRepository,
  User,
  iUpdateUser,
  iUserPass,
} from './iUser.repository';
import { prisma } from '../../../database/prisma';

export class UsersRepository implements iUserRepository {
  private repository: typeof prisma.users;

  constructor(repository: typeof prisma.users) {
    this.repository = repository;
  }

  async create({
    name,
    lastName,
    email,
    password,
  }: iCreateBody): Promise<User> {
    return this.repository.create({
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

  async findByToken(token: string): Promise<iUserPass> {
    const { id } = await loginService.decodeToken(token);
    const user = await prisma.users.findUnique({ where: { id } });
    return user;
  }
}
