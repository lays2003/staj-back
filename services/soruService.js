const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function olustur(soru, a, b, c, d, dogruCevap, kategori, resim) {
  const yeniSoru = await prisma.soru.create({
    data: {
      soru,
      a,
      b,
      c,
      d,
      dogruCevap,
      kategori,
      resim,
    }
  });
  return yeniSoru;
}

async function guncelle(id, guncelBilgiler) {
  const guncelSoru = await prisma.soru.update({
    where: {
      id,
    },
    data: guncelBilgiler,
  });
  return guncelSoru;
}

async function getir(id) {
  const soru = await prisma.soru.findFirst({
    where: {
      id,
    },
  });
  return soru;
}

async function getirTum() {
  const sorular = await prisma.soru.findMany();
  return sorular;
}

async function sil(id) {
  const soru = await prisma.soru.delete({
    where: {
      id,
    },
  });
  return soru;
}

async function getirKategoriIle(kategori) {
  const sorular = await prisma.soru.findMany({
    where: {
      kategori,
    },
  });
  return sorular;
}

async function getirCok(idListesi) {
  const sorular = await prisma.soru.findMany({
    where: {
      id: {in: idListesi},
    },
  });
  return sorular;
}

module.exports = {
  olustur,
  guncelle,
  getir,
  getirTum,
  sil,
  getirKategoriIle,
  getirCok,
};