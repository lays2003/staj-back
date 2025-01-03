const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const girisMiddleware = require("../utils/girisMiddleware");
const sinavService = require("../services/sinavService");
const soruService = require("../services/soruService");

router.use(girisMiddleware);

const kategoriSoruSayisi = {
  ehliyet: 50,
  ilkyardim: 10,
  trafik: 10,
  trafikadabi: 10,
  motor: 10,
};

// getir tüm
router.get("/", async (req, res, next) => {
  try {
    const kullaniciId = req.kullanici.id;
    const sinavlar = await sinavService.getir(kullaniciId);
    res.json({
      sinavlar,
    });
  } catch (error) {
    next(error);
  }
});

// olustur
router.post('/', async (req, res, next) => {
  try {
    const kullaniciId = req.kullanici.id;
    let {kategori} = req.body;
    if (!kategori || !kategori.trim()) throw new ApiError("kategori boş olmaz.");
    const yeniSinav = await sinavService.olustur(kullaniciId, kategori);

    const tumSorular = await soruService.getirKategoriIle(kategori);
    const karistirilanSorular = tumSorular.sort(() => 0.5 - Math.random());
    const secilenSorular = karistirilanSorular.slice(0, kategoriSoruSayisi[kategori]).map(soru => ({...soru, dogruCevap:undefined}));

    res.json({
      sinav: yeniSinav,
      sorular: secilenSorular,
    });
  } catch (error) {
     next(error);
  }
});

// guncelle
router.post('/:sinavId', async (req, res, next) => {
  try {
    const sinavId = parseInt(req.params.sinavId);
    const {soruCevap} = req.body;
    const idLitesi = Object.keys(soruCevap).map(id => parseInt(id));
    const sorular = await soruService.getirCok(idLitesi);
    
    let dogruCevaplar = 0;
    let yanlisCevaplar = 0;
    let bosCevaplar = 0;

    sorular.forEach(soru => {
      if (soruCevap[soru.id] == '') bosCevaplar++;
      else if (soruCevap[soru.id] == soru.dogruCevap) dogruCevaplar++;
      else yanlisCevaplar++;
    });

    await sinavService.guncelle(sinavId, {
      dogruCevaplar,
      yanlisCevaplar,
      bosCevaplar,
    });

    res.json({
      sorular,
      dogruCevaplar,
      yanlisCevaplar,
      bosCevaplar,
    });

  } catch (error) {
     next(error);
  }
});

module.exports = router;