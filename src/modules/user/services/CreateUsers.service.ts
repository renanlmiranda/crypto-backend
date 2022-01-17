/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import { iUsersRepository, User } from '../repository/iUser.repository';
import crypt from '../../../utils/hashCrypt';

@injectable()
export class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
  ) {}

  async execute({ name, lastName, email, password }): Promise<User> {
    try {
      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists) {
        throw new BadRequestError('Email already exists!');
      }

      const passwordHash = await crypt.createHash(password);
      const body = {
        password: passwordHash,
        name,
        lastName,
        email,
      };

      const user = await this.usersRepository.create(body);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
