import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Post,
} from 'routing-controllers';
import { createWalletBody } from './wallet.entity';
import { WalletRepository } from './wallet.repository';

@Controller('/wallets')
export default class WalletController {
  @Authorized()
  @Post('/')
  async create(@Body() body: createWalletBody, @CurrentUser() user) {
    const createdWallet = await WalletRepository.createWallet(body, user);

    return createdWallet;
  }
}
