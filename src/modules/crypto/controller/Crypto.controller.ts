/* eslint-disable no-bitwise */
import {
  Authorized,
  Body,
  Controller,
  Get,
  Param,
  Post,
  QueryParams,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { CryptoRepository } from '../repository/Crypto.repository';
import { CreateTransactionService } from '../services/CreateTransaction.service';
import { FindOneCryptoService } from '../services/FindOneCryptoService';
import { iBodyToCreateTransactions } from '../types/crypto.types';

const cryptoRepository = new CryptoRepository();

@Controller('/cryptos')
export default class CryptoController {
  @Authorized()
  @Get('/')
  async findAll(@QueryParams() query) {
    const data = await cryptoRepository.findAll(query);
    return data;
  }

  @Authorized()
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const findOneService = container.resolve(FindOneCryptoService);
    return findOneService.execute(id);
  }

  @Authorized()
  @Post('/')
  async create(@Body() body: iBodyToCreateTransactions) {
    const createTransactionService = container.resolve(
      CreateTransactionService,
    );
    return createTransactionService.execute(body);
  }
}
