const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const sifreleme = require("../utils/sifreleme");
const jwt = require("../utils/jwt");
const girisMiddleware = require("../utils/girisMiddleware");
const kullaniciService = require("../services/kullaniciService");

// olustur
router.post('/', async (req, res, next) => {
  try {
    let {ad, soyad, kullaniciadi, sifre} = req.body;
    if (!ad || !ad.trim()) throw new ApiError("ad boş olmaz.");
    if (!soyad || !soyad.trim()) throw new ApiError("soyad boş olmaz.");
    if (!kullaniciadi || !kullaniciadi.trim()) throw new ApiError("kullanıcıadı boş olmaz.");
    if (!sifre || !sifre.trim()) throw new ApiError("şifre boş olmaz.");
    ad = ad.trim();
    soyad = soyad.trim();
    kullaniciadi = kullaniciadi.trim().toLowerCase();

    const hashlanmisSifre = sifreleme.hash(sifre);
    const yeniKullanici = await kullaniciService.olustur(ad, soyad, kullaniciadi, hashlanmisSifre);
    yeniKullanici.sifre = undefined;
    res.json({
      kullanici: yeniKullanici,
    });
  } catch (error) {
     next(error);
  }
});

// giris
router.post('/giris', async (req, res, next) => {
  try {
    let {kullaniciadi, sifre} = req.body;

    if (!kullaniciadi || !kullaniciadi.trim()) throw new ApiError("kullanıcıadı boş olmaz.");
    if (!sifre || !sifre.trim()) throw new ApiError("şifre boş olmaz.");

    kullaniciadi = kullaniciadi.trim().toLowerCase();

    const kullanici = await kullaniciService.getir(kullaniciadi);
    if (!kullanici) {
      throw new ApiError("hatalı kullanıcıadı veya şifre.");
    }

    const sifreDogruMu = sifreleme.dogrula(sifre, kullanici.sifre);
    if (!sifreDogruMu) {
      throw new ApiError("hatalı kullanıcıadı veya şifre.");
    }

    const token = jwt.jwtTokenOlustur(kullanici.id);
    kullanici.sifre = undefined;
    kullanici.token = token;
    res.json({
      kullanici: kullanici,
    });
  } catch (error) {
     next(error);
  }
});

// guncelle
router.patch('/', girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const {ad, soyad, sifre} = req.body;
    
    const guncelBilgiler = {};
    if (ad && ad.trim()) {
      guncelBilgiler.ad = ad.trim();
    }

    if (soyad && soyad.trim()) {
      guncelBilgiler.soyad = soyad.trim();
    }

    if (sifre && sifre.trim()) {
      guncelBilgiler.sifre = sifreleme.hash(sifre);
    }

    const guncelKullanici = await kullaniciService.guncelle(kullanici.id, guncelBilgiler);
    guncelKullanici.sifre = undefined;
    res.json({
      kullanici: guncelKullanici,
    });
  } catch (error) {
     next(error);
  }
});

// profil
router.get("/", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    kullanici.sifre = undefined;
    res.json({
      kullanici,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;