const date = '2023-07-05T22:12:44.000Z';

const allSalesFromDB = [
  {
    date,
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    date,
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const allSalesFromModel = [
  {
    date,
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    date,
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const saleByIdFromDB = [
  {
    date,
    productId: 3,
    quantity: 15,
  },
];

const saleByIdFromModel = [
  {
    date,
    productId: 3,
    quantity: 15,
  },
];

const saleIdFromDB = { insertId: 8 };
const saleFromModel = {
  id: 8,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  allSalesFromDB,
  allSalesFromModel,
  saleByIdFromDB,
  saleByIdFromModel,
  saleIdFromDB,
  saleFromModel,
};