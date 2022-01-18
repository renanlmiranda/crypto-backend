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
      const { id } = await tokenUtils.decodeToken(token);
      const user = await this.usersRepository.findOne(id);

      if (!user) {
        throw new BadRequestError('user not exists!');
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
