/*
  Warnings:

  - Added the required column `color` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
