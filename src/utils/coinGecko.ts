/* eslint-disable no-bitwise */
import CoinGecko from 'coingecko-api';
import QueryParamsClass from '../core/crypto/crypto.types';

const CoinGeckoClient = new CoinGecko();

export const listAll = async (query: QueryParamsClass) => {
  const data = await CoinGeckoClient.coins.all(query);
  return data;
};

export const listOne = async () => {
  const data = 0;
  return data;
};
