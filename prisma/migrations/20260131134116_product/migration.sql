/*
  Warnings:

  - Made the column `quantity` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "quantity" SET NOT NULL;
