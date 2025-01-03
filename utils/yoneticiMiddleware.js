const ApiError = require("./ApiError");

module.exports = async function(req, res, next) {
  try {
    if (!req.kullanici || !req.kullanici.yonetici) {
      throw new ApiError('izinsiz erişim');
    }
    next();
  } catch (error) {
    next(error);
  }
}