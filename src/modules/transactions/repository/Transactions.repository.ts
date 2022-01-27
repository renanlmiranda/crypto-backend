/* eslint-disable import/prefer-default-export */
import { Prisma, Transactions } from '@prisma/client';
import { iBodyToCreateTransactions } from '../types/Transactions.types';
import { prisma } from '../../../database/prisma';

export class TransactionsRepository {
  async create({
    name,
    abbreviation,
    quantity,
    price,
    fees,
    typeId,
    walletId,
  }: iBodyToCreateTransactions): Promise<Transactions> {
    return prisma.transactions.create({
      data: {
        name,
        abbreviation,
        quantity,
        price,
        fees,
        typeId,
        walletId,
      },
    });
  }
}
