/*
  Warnings:

  - You are about to drop the column `comment` on the `product_reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_user_id_fkey";

-- AlterTable
ALTER TABLE "product_reviews" DROP COLUMN "comment";
