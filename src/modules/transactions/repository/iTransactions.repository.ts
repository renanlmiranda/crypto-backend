import { Transactions } from '@prisma/client';
import { iBodyToCreateTransactions } from '../types/Transactions.types';

export interface iTransactionsRepository {
  create(body: iBodyToCreateTransactions): Promise<Transactions>;
}
