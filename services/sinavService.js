const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function olustur(kullaniciId, kategori) {
  const yeniSinav = await prisma.sinav.create({
    data: {
      kullaniciId,
      kategori,
    }
  });
  return yeniSinav;
}

async function guncelle(id, guncelBilgiler) {
  const guncelSinav = await prisma.sinav.update({
    where: {
      id,
    },
    data: guncelBilgiler,
  });
  return guncelSinav;
}

async function getir(kullaniciId) {
  const sinavlar = await prisma.sinav.findMany({
    where: {
      kullaniciId,
    }
  });
  return sinavlar;
}

module.exports = {
  olustur,
  guncelle,
  getir,
};