/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import {
  iUpdateUser,
  User,
  iUsersRepository,
} from '../repository/iUser.repository';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
  ) {}

  async execute(id: number, body: iUpdateUser): Promise<User> {
    try {
      const userExists = await this.usersRepository.findOne(id);

      if (!userExists) {
        throw new BadRequestError('User not exists');
      }

      const updateUser = await this.usersRepository.update(id, body);

      return updateUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
