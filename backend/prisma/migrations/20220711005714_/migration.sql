/*
  Warnings:

  - Added the required column `image` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "image" TEXT NOT NULL;
