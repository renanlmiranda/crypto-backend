/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { UsersRepository } from '../repository/User.repository';
import { iUpdateUser, User } from '../repository/iUser.repository';

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number, body: iUpdateUser): Promise<User> {
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new BadRequestError('User not exists');
    }

    const updateUser = await this.usersRepository.update(id, body);

    return updateUser;
  }
}
