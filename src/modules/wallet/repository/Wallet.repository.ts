/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Users } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { iDeletedReponse } from '../../../DTO/reponses.dto';
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

  async findAll(userId: number) {
    return prisma.wallets.findMany({ where: { user_id: userId } });
  }

  async deleteMany(userId: number) {
    await prisma.wallets.deleteMany({
      where: { user_id: userId },
    });

    return true;
  }

  async delete(id: number): Promise<iDeletedReponse> {
    await prisma.wallets.delete({
      where: { id },
    });

    return { deleted: true };
  }
}
