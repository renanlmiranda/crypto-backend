/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { injectable, inject } from 'tsyringe';
import { iCreatedResponse } from '../../../DTO/reponses.dto';
import { iCryptoRepository } from '../repository/iCrypto.repository';
import { iBodyToCreateTransactions } from '../types/crypto.types';

@injectable()
export class CreateTransactionService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: iCryptoRepository,
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

      await this.cryptoRepository.create({
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
