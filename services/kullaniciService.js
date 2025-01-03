const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function olustur(ad, soyad, kullaniciadi, sifre) {
  const kullaniciSayisi = await prisma.kullanici.count();
  const kullanici = await prisma.kullanici.create({
    data: {
      ad,
      soyad,
      kullaniciadi,
      sifre,
      yonetici: kullaniciSayisi == 0,
    }
  });
  return kullanici;
}

async function guncelle(id, guncelBilgiler) {
  const kullanici = await prisma.kullanici.update({
    where: {
      id,
    },
    data: guncelBilgiler,
  });
  return kullanici;
}

async function getir(kullaniciadi) {
  const kullanici = await prisma.kullanici.findFirst({
    where: {
      kullaniciadi,
    },
  });
  return kullanici;
}

async function getirIdIle(id) {
  const kullanici = await prisma.kullanici.findFirst({
    where: {
      id,
    },
  });
  return kullanici;
}

module.exports = {
  olustur,
  guncelle,
  getir,
  getirIdIle,
};