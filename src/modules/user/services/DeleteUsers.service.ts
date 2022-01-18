/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';
import { iWalletRepository } from '../../wallet/repository/iWallet.repository';
import {
  iReponseDeleted,
  iUsersRepository,
} from '../repository/iUser.repository';

@injectable()
export class DeleteUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,
    @inject('WalletRepository')
    private walletRepository: iWalletRepository,
  ) {}

  async execute(id: number): Promise<iReponseDeleted> {
    try {
      const userExists = await this.usersRepository.findOne(id);

      if (!userExists || userExists.deleted !== null) {
        throw new BadRequestError('User not exists or already deleted!');
      }

      await this.usersRepository.update(id, {
        deleted: new Date(),
      });

      await this.walletRepository.deleteMany(userExists.id);

      return { deleted: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
