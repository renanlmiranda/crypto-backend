import { Users } from '@prisma/client';
import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Delete,
  Get,
  Param,
  Post,
} from 'routing-controllers';
import { WalletRepository } from '../repository/Wallet.repository';

const walletRepository = new WalletRepository();

@Controller('/wallets')
export default class WalletController {
  @Authorized()
  @Post('/')
  async create(@Body() body, @CurrentUser() user) {
    const createdWallet = await walletRepository.create(body, user);
    return createdWallet;
  }

  // Colocar authorized
  @Get('/')
  async findAll(@CurrentUser() user: Users) {
    const findAll = await walletRepository.findAll(user.id);
    return findAll;
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return walletRepository.findOne(id);
  }

  @Authorized('/wallets/:id')
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return walletRepository.delete(id);
  }
}
