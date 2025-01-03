/*
  Warnings:

  - Added the required column `kullaniciId` to the `Sinav` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sinav" ADD COLUMN     "kullaniciId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sinav" ADD CONSTRAINT "Sinav_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
