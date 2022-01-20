/* eslint-disable import/prefer-default-export */
import CoinGecko from 'coingecko-api';
import { Transactions } from '@prisma/client';
import { iBodyToCreateTransactions } from '../types/crypto.types';
import { prisma } from '../../../database/prisma';

const cryptoRepository = new CoinGecko();

export class CryptoRepository {
  async findOne(coinId: string, params): Promise<any> {
    return cryptoRepository.coins.fetch(coinId, params);
  }

  async findAll(query): Promise<any> {
    return cryptoRepository.coins.all(query);
  }

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
      data: { name, abbreviation, quantity, price, fees, typeId, walletId },
    });
  }
}
