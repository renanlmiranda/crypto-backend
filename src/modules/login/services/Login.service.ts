/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import { iUsersRepository } from '../../user/repository/iUser.repository';
import crypt from '../../../utils/hashCrypt';
import token from '../../../utils/token';

@injectable()
export class LoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
  ) {}

  async execute(body): Promise<any> {
    try {
      const userExists = await this.usersRepository.findByEmail(body.email);

      if (!userExists) {
        throw new BadRequestError('Login invalid!');
      }
      const comparePassword = await crypt.compareHash(
        body.password,
        userExists.password,
      );

      if (!comparePassword) {
        throw new BadRequestError('Invalid Credintials!');
      }

      const createToken = await token.generateToken(userExists.id);

      return { user: userExists, token: createToken };
    } catch (error) {
      throw new Error(error);
    }
  }
}
