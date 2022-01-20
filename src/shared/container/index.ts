import { container } from 'tsyringe';
import { CryptoRepository } from '../../modules/crypto/repository/Crypto.repository';
import { iCryptoRepository } from '../../modules/crypto/repository/iCrypto.repository';
import { iUsersRepository } from '../../modules/user/repository/iUser.repository';
import { UsersRepository } from '../../modules/user/repository/User.repository';
import { iWalletRepository } from '../../modules/wallet/repository/iWallet.repository';
import { WalletRepository } from '../../modules/wallet/repository/Wallet.repository';

container.registerSingleton<iUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<iWalletRepository>(
  'WalletRepository',
  WalletRepository,
);

container.registerSingleton<iCryptoRepository>(
  'CryptoRepository',
  CryptoRepository,
);
