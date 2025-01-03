/*
  Warnings:

  - Made the column `bosCevaplar` on table `Sinav` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dogruCevaplar` on table `Sinav` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yanlisCevaplar` on table `Sinav` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sinav" ALTER COLUMN "bosCevaplar" SET NOT NULL,
ALTER COLUMN "bosCevaplar" SET DEFAULT 0,
ALTER COLUMN "dogruCevaplar" SET NOT NULL,
ALTER COLUMN "dogruCevaplar" SET DEFAULT 0,
ALTER COLUMN "yanlisCevaplar" SET NOT NULL,
ALTER COLUMN "yanlisCevaplar" SET DEFAULT 0;
