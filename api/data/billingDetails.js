exports.taxes = [
  {
    country: 'Morocco',
    rate: 0.05,
  },
  {
    country: 'France',
    rate: 0.1,
  },
  {
    country: 'United states',
    rate: 0.3,
  },
  {
    country: 'Germany',
    rate: 0.15,
  },
];

exports.shippingPrices = [
  {
    type: 'local',
    price: 100,
    minDays: 1,
    maxDays: 3,
  },
  {
    type: 'foreign',
    price: 300,
    minDays: 3,
    maxDays: 10,
  },
];
