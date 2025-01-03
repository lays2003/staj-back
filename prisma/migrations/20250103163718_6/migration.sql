/*
  Warnings:

  - Added the required column `kategori` to the `Sinav` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sinav" ADD COLUMN     "kategori" TEXT NOT NULL;
