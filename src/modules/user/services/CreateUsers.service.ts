/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import { iCreatedUser, iUsersRepository } from '../repository/iUser.repository';
import crypt from '../../../utils/hashCrypt';

@injectable()
export class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
  ) {}

  async execute({ name, lastName, email, password }): Promise<iCreatedUser> {
    try {
      if (!email || !password) {
        throw new BadRequestError('Data is not correct!');
      }

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

      await this.usersRepository.create(body);

      return { created: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
