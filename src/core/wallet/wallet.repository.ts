/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const WalletRepository = {
  createWallet: async (body, user): Promise<any> => {
    const data = { user_id: user.id, ...body };
    const wallet = await prisma.wallets.create({ data });
    return wallet;
  },
};
