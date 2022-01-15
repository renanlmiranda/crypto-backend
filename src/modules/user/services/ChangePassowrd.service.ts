/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { UsersRepository } from '../repository/User.repository';
import { iUpdatePassword } from '../repository/iUser.repository';
import crypt from '../../../utils/hashCrypt';

export class ChangePasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number, body: iUpdatePassword): Promise<any> {
    const { oldPassword, password } = body;
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new BadRequestError('User not exists');
    }

    const comparePassword = await crypt.compareHash(
      oldPassword,
      userExists.password,
    );

    if (!comparePassword) {
      throw new BadRequestError('Wrong password');
    }

    const createHash = await crypt.createHash(password);
    const data = { password: createHash };

    const user = this.usersRepository.update(id, data);
    return user;
  }
}
