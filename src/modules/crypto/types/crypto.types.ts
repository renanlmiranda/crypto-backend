import { Decimal } from '@prisma/client/runtime';

export interface iBodyToCreateTransactions {
  name: string;
  abbreviation: string;
  quantity: number;
  price: Decimal;
  fees?: Decimal;
  typeId: number;
  walletId: number;
}
