/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../database/prisma';

export const WalletRepository = {
  createWallet: async (body, user): Promise<any> => {
    const data = { user_id: user.id, ...body };
    const wallet = await prisma.wallets.create({ data });
    return wallet;
  },
};
