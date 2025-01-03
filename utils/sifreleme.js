const bcrypt = require('bcrypt');

function hash(sifre) {
  return bcrypt.hashSync(sifre, 12);
}

function dogrula(sifre, hashlanmisSifre) {
  return bcrypt.compareSync(sifre, hashlanmisSifre);
}

module.exports = {
  hash,
  dogrula,
};