/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Users } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { iWalletBody, iWalletRepository } from './iWallet.repository';

export class WalletRepository implements iWalletRepository {
  async create(body: iWalletBody, user: Users) {
    return prisma.wallets.create({
      data: {
        user_id: user.id,
        ...body,
      },
    });
  }

  async deleteMany(userId: number) {
    await prisma.wallets.deleteMany({
      where: { user_id: userId },
    });

    return true;
  }

  async delete(id: number) {
    await prisma.wallets.delete({
      where: { id },
    });

    return true;
  }
}
