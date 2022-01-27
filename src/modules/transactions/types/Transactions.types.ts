export interface iBodyToCreateTransactions {
  name: string;
  abbreviation: string;
  quantity: number;
  price: number;
  fees?: number;
  typeId: number;
  walletId: number;
}
