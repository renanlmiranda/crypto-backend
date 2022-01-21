import { Wallets } from '@prisma/client';
import { iDeletedReponse } from '../../../DTO/reponses.dto';
import { User } from '../../user/repository/iUser.repository';

export interface iWalletBody {
  name: string;
  description: string;
}
export interface iWalletRepository {
  create(body: iWalletBody, user: User): Promise<Wallets>;
  findAll(userId: number): Promise<Wallets[]>;
  deleteMany(userId: number): Promise<boolean>;
  delete(id: number): Promise<iDeletedReponse>;
}
