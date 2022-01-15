/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersRepository } from '../repository/User.repository';

const usersRepository = new UsersRepository();

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
    usersRepository.create = jest.fn().mockReturnValueOnce(userCreated);

    const newUser = usersRepository.create(newUserBody);
    expect(newUser).toEqual(userCreated);
  });
});
