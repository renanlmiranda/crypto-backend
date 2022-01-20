import { Transactions } from '@prisma/client';
import { iBodyToCreateTransactions } from '../types/crypto.types';

export interface iCryptoRepository {
  findOne(coinId: string, params): Promise<any>;
  findAll(query): Promise<any>;
  create(body: iBodyToCreateTransactions): Promise<Transactions>;
}
