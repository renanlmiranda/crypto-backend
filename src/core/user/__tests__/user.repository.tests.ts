/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../user.repository';

const prisma = new PrismaClient();

const userCreated = {
  id: 1,
  name: 'Teste name',
  last_name: 'Test lastName',
  email: 'teste@gmail.com',
  password: '$2b$10$b.MuWrsshwLdIXHLCRVWYOHJ0MjmM/mSLVhcrmF97UHKXP3gXZLsa',
};

const newUserBody = {
  name: 'Teste name',
  last_name: 'Test lastName',
  email: 'teste@gmail.com',
  password: '123456',
};
describe('test user repository', () => {
  test('test create user function', () => {
    UserRepository.createUser = jest.fn().mockReturnValueOnce(userCreated);

    const newUser = UserRepository.createUser(newUserBody);
    expect(newUser).toEqual(userCreated);
  });
});
