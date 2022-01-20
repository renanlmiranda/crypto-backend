/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';
import { iUserPass, iUsersRepository } from '../repository/iUser.repository';
import tokenUtils from '../../../utils/token';

@injectable()
export class FindByTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
  ) {}

  async execute(token: string): Promise<iUserPass> {
    try {
      const userInfo = await tokenUtils.decodeToken(token);

      if (!userInfo) {
        throw new BadRequestError('Wrong token!');
      }
      const user = await this.usersRepository.findOne(userInfo.id);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
