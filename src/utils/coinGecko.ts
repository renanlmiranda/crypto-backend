/* eslint-disable no-bitwise */
import CoinGecko from 'coingecko-api';
import QueryParamsClass from '../core/crypto/crypto.types';

const CoinGeckoClient = new CoinGecko();

export const listAll = async (query: QueryParamsClass) => {
  const data = await CoinGeckoClient.coins.all(query);
  return data;
};

export const listOne = async (id: string) => {
  const coinId = id;
  const params = {
    tickers: false,
    community_data: false,
    localization: false,
    developer_data: false,
  };
  const data = await CoinGeckoClient.coins.fetch(coinId, params);
  return data;
};
