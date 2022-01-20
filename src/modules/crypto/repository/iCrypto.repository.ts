export interface iCryptoRepository {
  findOne(coinId: string, params): Promise<any>;
  findAll(query): Promise<any>;
}
