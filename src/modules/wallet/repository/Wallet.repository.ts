/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../../database/prisma';

export class WalletRepository {
  async create(body, user) {
    return prisma.wallets.create({
      data: {
        user_id: user.id,
        ...body,
      },
    });
  }
}
