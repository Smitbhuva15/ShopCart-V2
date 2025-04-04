-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productIds" TEXT[],
ALTER COLUMN "itemName" DROP NOT NULL;
