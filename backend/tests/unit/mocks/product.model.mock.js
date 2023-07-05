const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const allProductsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productByIdFromDB = {
  id: 42,
  name: 'Traje de encolhimento',
};

const productByIdFromModel = {
  id: 42,
  name: 'Traje de encolhimento',
};

const productIdFromDB = { insertId: 42 };
const productIdFromModel = 42;

module.exports = {
  allProductsFromDB,
  allProductsFromModel,
  productByIdFromDB,
  productByIdFromModel,
  productIdFromDB,
  productIdFromModel,
};