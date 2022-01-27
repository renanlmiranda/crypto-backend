/* eslint-disable no-bitwise */
import { Authorized, Body, Controller, Post } from 'routing-controllers';
import { container } from 'tsyringe';
import { iBodyToCreateTransactions } from '../types/Transactions.types';
import { CreateTransactionService } from '../services/CreateTransaction.service';

@Controller('/cryptos')
export default class TransactionsController {
  @Post('/')
  async create(@Body() body: iBodyToCreateTransactions) {
    const createTransactionService = container.resolve(
      CreateTransactionService,
    );
    return createTransactionService.execute(body);
  }
}
