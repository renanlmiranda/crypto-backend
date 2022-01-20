/* eslint-disable import/prefer-default-export */
import CoinGecko from 'coingecko-api';

const cryptoRepository = new CoinGecko();

export class CryptoRepository {
  async findOne(coinId: string, params): Promise<any> {
    return cryptoRepository.coins.fetch(coinId, params);
  }

  async findAll(query): Promise<any> {
    return cryptoRepository.coins.all(query);
  }
}
