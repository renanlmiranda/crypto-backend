/* eslint-disable no-bitwise */
import {
  Authorized,
  Controller,
  Get,
  Param,
  QueryParams,
} from 'routing-controllers';
import { listAll, listOne } from '../../utils/coinGecko';
import QueryParamsClass from './crypto.types';

@Controller('/cryptos')
export default class CryptoController {
  @Authorized()
  @Get('/')
  async getAll(@QueryParams() query: QueryParamsClass) {
    const data = await listAll(query);
    return data;
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const data = await listOne(id);
    return data;
  }
}
