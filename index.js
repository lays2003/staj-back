const express = require('express');
require('dotenv').config();
const cors = require('cors');

const ApiError = require('./utils/ApiError');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/kullanici', require('./routes/kullaniciRoute'));
app.use('/soru', require('./routes/soruRoute'));
app.use('/sinav', require('./routes/sinavRoute'));

app.get("/", (req, res) => {
  res.json({status: "ok"});
});

app.use((error, req, res, next) => {
  console.log(error);
  let errorMsg = "";
  if (error.code === 'P2002') {
    errorMsg = `${error.meta.target[0]} zaten mevcut.`;
  }

  if (error.code === 'P2025') {
    errorMsg = `${error.meta.modelName} bulunamadı.`;
  }

  if (error instanceof ApiError) {
    errorMsg = error.message;
  }

  if (error.name == "JsonWebTokenError") {
    errorMsg = "izinsiz erişim";
  }

  if (errorMsg.length === 0) {
    errorMsg = "bilinmeyen bir hata oluştu";
  }

  res.json({
    error: true,
    errorMsg,
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log("Sunucu http://localhost:3000 adreste çalışıyor");
});