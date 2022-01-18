import { Wallets } from '@prisma/client';
import { User } from '../../user/repository/iUser.repository';

export interface iWalletBody {
  name: string;
  description: string;
}
export interface iWalletRepository {
  create(body: iWalletBody, user: User): Promise<Wallets>;
  deleteMany(userId: number): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}