const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const sifreleme = require("../utils/sifreleme");
const jwt = require("../utils/jwt");
const girisMiddleware = require("../utils/girisMiddleware");
const yoneticiMiddleware = require('../utils/yoneticiMiddleware');
const soruService = require("../services/soruService");

// getir
router.get("/:soruId", async (req, res, next) => {
  try {
    const soruId = parseInt(req.params.soruId);
    const soru = await soruService.getir(soruId);
    res.json({
      soru,
    });
  } catch (error) {
    next(error);
  }
});

router.use(girisMiddleware);
router.use(yoneticiMiddleware);

// getir tüm
router.get("/", async (req, res, next) => {
  try {
    const sorular = await soruService.getirTum();
    res.json({
      sorular,
    });
  } catch (error) {
    next(error);
  }
});

// olustur
router.post('/', async (req, res, next) => {
  try {
    let {soru, a, b, c, d, dogruCevap, kategori, resim} = req.body;
    if (!soru || !soru.trim()) throw new ApiError("soru boş olmaz.");
    if (!a || !a.trim()) throw new ApiError("a şıkkı boş olmaz.");
    if (!b || !b.trim()) throw new ApiError("b şıkkı boş olmaz.");
    if (!c || !c.trim()) throw new ApiError("c şıkkı boş olmaz.");
    if (!d || !d.trim()) throw new ApiError("d şıkkı boş olmaz.");
    if (!dogruCevap || !dogruCevap.trim()) throw new ApiError("doğru cevap boş olmaz.");
    if (!kategori || !kategori.trim()) throw new ApiError("kategori boş olmaz.");

    soru = soru.trim();
    a = a.trim();
    b = b.trim();
    c = c.trim();
    d = d.trim();
    dogruCevap = dogruCevap.trim().toLowerCase();
    if (!["a", "b", "c", "d"].includes(dogruCevap)) {
      throw new ApiError("doğru cevap a, b, c veya d olmalıdır")
    }

    kategori = kategori.trim().toLowerCase();
    if (resim && resim.trim()) resim = resim.trim();
    else resim = null;

    const yeniSoru = await soruService.olustur(soru, a, b, c, d, dogruCevap, kategori, resim);
    res.json({
      soru: yeniSoru,
    });
  } catch (error) {
     next(error);
  }
});

// guncelle
router.patch('/:soruId', async (req, res, next) => {
  try {
    const soruId = parseInt(req.params.soruId);
    let {soru, a, b, c, d, dogruCevap, kategori, resim} = req.body;
    if (!soru || !soru.trim()) throw new ApiError("soru boş olmaz.");
    if (!a || !a.trim()) throw new ApiError("a şıkkı boş olmaz.");
    if (!b || !b.trim()) throw new ApiError("b şıkkı boş olmaz.");
    if (!c || !c.trim()) throw new ApiError("c şıkkı boş olmaz.");
    if (!d || !d.trim()) throw new ApiError("d şıkkı boş olmaz.");
    if (!dogruCevap || !dogruCevap.trim()) throw new ApiError("doğru cevap boş olmaz.");
    if (!kategori || !kategori.trim()) throw new ApiError("kategori boş olmaz.");

    const guncelBilgiler = {};
    guncelBilgiler.soru = soru.trim();
    guncelBilgiler.a = a.trim();
    guncelBilgiler.b = b.trim();
    guncelBilgiler.c = c.trim();
    guncelBilgiler.d = d.trim();
    guncelBilgiler.dogruCevap = dogruCevap.trim().toLowerCase();
    if (!["a", "b", "c", "d"].includes(guncelBilgiler.dogruCevap)) {
      throw new ApiError("doğru cevap a, b, c veya d olmalıdır")
    }
    guncelBilgiler.kategori = kategori.trim().toLowerCase();
    if (resim && resim.trim()) guncelBilgiler.resim = resim.trim();

    const guncelSoru = await soruService.guncelle(soruId, guncelBilgiler);
    res.json({
      soru: guncelSoru,
    });
  } catch (error) {
     next(error);
  }
});

// sil
router.delete("/:soruId", async (req, res, next) => {
  try {
    const soruId = parseInt(req.params.soruId);
    const soru = await soruService.sil(soruId);
    res.json({
      soru,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;