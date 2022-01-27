/*
  Warnings:

  - You are about to alter the column `quantity` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `fees` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_wallet_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "fees" SET DATA TYPE DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
