/* eslint-disable no-bitwise */
import { Controller, Get, QueryParams } from 'routing-controllers';
import { listAll } from '../../utils/coinGecko';
import QueryParamsClass from './crypto.types';

@Controller('/cryptos')
export default class CryptoController {
  @Get('/')
  async getAll(@QueryParams() query: QueryParamsClass) {
    const data = await listAll(query);
    return data;
  }
}
