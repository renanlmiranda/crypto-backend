/* eslint-disable no-bitwise */
import {
  Authorized,
  Controller,
  Get,
  Param,
  QueryParams,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { CryptoRepository } from '../repository/Crypto.repository';
import QueryParamsClass from '../crypto.types';
import { FindOneService } from '../services/FindOneService';

const cryptoRepository = new CryptoRepository();

@Controller('/cryptos')
export default class CryptoController {
  @Authorized()
  @Get('/')
  async findAll(@QueryParams() query: QueryParamsClass) {
    const data = await cryptoRepository.findAll(query);
    return data;
  }

  @Authorized()
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const findOneService = container.resolve(FindOneService);
    return findOneService.execute(id);
  }
}
