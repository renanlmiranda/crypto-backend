/* eslint-disable import/prefer-default-export */
import { injectable, inject } from 'tsyringe';
import { iCryptoRepository } from '../repository/iCrypto.repository';

@injectable()
export class FindOneService {
  constructor(
    @inject('CryptoRepository')
    private cryptoRepository: iCryptoRepository,
  ) {}

  async execute(id: string): Promise<any> {
    const coinId = id;
    const params = {
      tickers: false,
      community_data: false,
      localization: false,
      developer_data: false,
    };

    return this.cryptoRepository.findOne(coinId, params);
  }
}
