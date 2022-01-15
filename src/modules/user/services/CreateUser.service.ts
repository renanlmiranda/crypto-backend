/* eslint-disable import/prefer-default-export */
import { BadRequestError, UnauthorizedError } from 'routing-controllers';
import { UsersRepository } from '../repository/User.repository';
import crypt from '../../../utils/hashCrypt';

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, lastName, email, password }) {
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
  }
}
