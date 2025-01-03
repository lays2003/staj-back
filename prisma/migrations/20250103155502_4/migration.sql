/*
  Warnings:

  - You are about to drop the `SinavSoru` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SinavSoru" DROP CONSTRAINT "SinavSoru_sinavId_fkey";

-- DropForeignKey
ALTER TABLE "SinavSoru" DROP CONSTRAINT "SinavSoru_soruId_fkey";

-- AlterTable
ALTER TABLE "Sinav" ADD COLUMN     "bosCevaplar" INTEGER,
ADD COLUMN     "dogruCevaplar" INTEGER,
ADD COLUMN     "yanlisCevaplar" INTEGER;

-- DropTable
DROP TABLE "SinavSoru";
