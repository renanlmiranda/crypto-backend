import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Post,
} from 'routing-controllers';
import { WalletRepository } from '../repository/Wallet.repository';

const walletRepository = new WalletRepository();

@Controller('/wallets')
export default class WalletController {
  @Authorized()
  @Post('/')
  async create(@Body() body, @CurrentUser() user) {
    console.log(user);
    const createdWallet = await walletRepository.create(body, user);
    return createdWallet;
  }
}
