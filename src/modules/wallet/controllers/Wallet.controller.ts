import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Post,
} from 'routing-controllers';
import { createWalletBody } from '../Wallet.types';
import { WalletRepository } from '../repository/Wallet.repository';

const walletRepository = new WalletRepository();

@Controller('/wallets')
export default class WalletController {
  @Authorized()
  @Post('/')
  async create(@Body() body: createWalletBody, @CurrentUser() user) {
    const createdWallet = await walletRepository.create(body, user);
    return createdWallet;
  }
}
