/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import {
  iUpdatePassword,
  iUsersRepository,
} from '../repository/iUser.repository';
import crypt from '../../../utils/hashCrypt';

@injectable()
export class ChangePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
  ) {}

  async execute(id: number, body: iUpdatePassword): Promise<any> {
    try {
      const { oldPassword, password } = body;
      const userExists = await this.usersRepository.findOne(id);

      if (!userExists) {
        throw new BadRequestError('User not exists!');
      }

      const comparePassword = await crypt.compareHash(
        oldPassword,
        userExists.password,
      );

      if (!comparePassword) {
        throw new BadRequestError('Wrong password!');
      }

      const createHash = await crypt.createHash(password);
      const data = { password: createHash };

      await this.usersRepository.update(id, data);
      return { updated: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
