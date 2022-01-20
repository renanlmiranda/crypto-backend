/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import { iCreatedResponse } from '../../../DTO/reponses.dto';
import { iTransactionsRepository } from '../repository/iTransactions.repository';
import { iBodyToCreateTransactions } from '../types/Transactions.types';

@injectable()
export class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: iTransactionsRepository,
  ) {}

  async execute({
    name,
    abbreviation,
    quantity,
    price,
    fees,
    typeId,
    walletId,
  }: iBodyToCreateTransactions): Promise<iCreatedResponse> {
    try {
      const VALID_TYPES = [1, 2, 3];
      const validate = VALID_TYPES.includes(typeId);

      if (!validate) {
        throw new BadRequestError('Invalid type!');
      }

      await this.transactionsRepository.create({
        name,
        abbreviation,
        quantity,
        price,
        fees,
        typeId,
        walletId,
      });

      return { created: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
