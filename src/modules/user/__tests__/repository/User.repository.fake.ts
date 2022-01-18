/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
import { Role, Status, Users } from '@prisma/client';
import {
  iCreateBody,
  iUpdateUser,
  iUserPass,
  iUsersRepository,
  User,
} from '../../repository/iUser.repository';
import { BODY_TO_CREATE_USER } from '../mocks/users.mock';

export class UserRepositoryFake implements iUsersRepository {
  users: Users[] = [];

  async create({
    name,
    lastName,
    email,
    password,
  }: iCreateBody): Promise<User> {
    const user: Users = {
      id: 1,
      name,
      lastName,
      email,
      password,
      ...BODY_TO_CREATE_USER,
    };

    this.users.push(user);
    return user;
  }

  async update(id: number, body: iUpdateUser): Promise<User> {
    const findUser = this.users.find(user => user.id === id);
    const result = Object.assign(findUser, body);

    return result;
  }

  async findOne(id: number): Promise<iUserPass> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<iUserPass> {
    return this.users.find(user => user.email === email);
  }
}
