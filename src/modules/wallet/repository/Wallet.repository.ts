/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, Users } from '@prisma/client';
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

  async findOne(id: number) {
    return prisma.$queryRaw`
    SELECT
      t."name", sum(t.quantity) as total_quantity, avg(t.price) as media, sum(t.fees) as total_fees
    FROM transactions t
	  INNER JOIN wallets w on w.id = t.wallet_id
    WHERE t.wallet_id = ${id}
    GROUP BY t."name"
    `;
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
