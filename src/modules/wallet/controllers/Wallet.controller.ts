import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Delete,
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

  @Authorized('/wallets/:id')
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return walletRepository.delete(id);
  }
}
