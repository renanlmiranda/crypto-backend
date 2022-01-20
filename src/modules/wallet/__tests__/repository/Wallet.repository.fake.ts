/* eslint-disable import/prefer-default-export */
import { Wallets } from '@prisma/client';
import { User } from '../../../user/repository/iUser.repository';
import {
  iWalletBody,
  iWalletRepository,
} from '../../repository/iWallet.repository';
import { BODY_TO_CREATE_WALLET } from '../mocks/wallets.mock';

export class WalletRepositoryFake implements iWalletRepository {
  wallets: Wallets[] = [];

  async create(body: iWalletBody, user: User) {
    const wallet: Wallets = {
      id: 1,
      name: body.name,
      description: body.description,
      user_id: user.id,
      ...BODY_TO_CREATE_WALLET,
    };
    this.wallets.push(wallet);
    return wallet;
  }

  async deleteMany(userId: number) {
    this.wallets.filter(wallet => wallet.user_id !== userId);

    return true;
  }

  async delete(id: number) {
    this.wallets.filter(wallet => wallet.id !== id);
    return true;
  }
}
