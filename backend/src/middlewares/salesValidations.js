const saleFieldsValidation = (req, res, next) => {
  const { body } = req;

  const missingKey = body.reduce((acc, curr) => {
    let field;
    if (typeof curr.productId === 'undefined') field = 'productId';
    if (typeof curr.quantity === 'undefined') field = 'quantity';
    return field;
  }, undefined);
  if (missingKey) {
    return res.status(400).json({ message: `"${missingKey}" is required` });
  }
  return next();
};

module.exports = saleFieldsValidation;