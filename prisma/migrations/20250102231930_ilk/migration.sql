-- CreateTable
CREATE TABLE "Kullanici" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "kullaniciadi" TEXT NOT NULL,
    "sifre" TEXT NOT NULL,

    CONSTRAINT "Kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soru" (
    "id" SERIAL NOT NULL,
    "soru" TEXT NOT NULL,
    "a" TEXT NOT NULL,
    "b" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "d" TEXT NOT NULL,
    "dogruCevap" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "resim" TEXT,

    CONSTRAINT "Soru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sinav" (
    "id" SERIAL NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sinav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SinavSoru" (
    "id" SERIAL NOT NULL,
    "sinavId" INTEGER NOT NULL,
    "soruId" INTEGER NOT NULL,

    CONSTRAINT "SinavSoru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_id_key" ON "Kullanici"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_kullaniciadi_key" ON "Kullanici"("kullaniciadi");

-- CreateIndex
CREATE UNIQUE INDEX "Soru_id_key" ON "Soru"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sinav_id_key" ON "Sinav"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SinavSoru_id_key" ON "SinavSoru"("id");

-- AddForeignKey
ALTER TABLE "SinavSoru" ADD CONSTRAINT "SinavSoru_sinavId_fkey" FOREIGN KEY ("sinavId") REFERENCES "Sinav"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinavSoru" ADD CONSTRAINT "SinavSoru_soruId_fkey" FOREIGN KEY ("soruId") REFERENCES "Soru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
