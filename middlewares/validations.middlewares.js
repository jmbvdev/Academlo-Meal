const { validationResult } = require('express-validator');
const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('. ');
    return res.status(400).json({ status: 'error', message: errorMsg });
  }
  next();
};

module.exports = { checkValidations };
