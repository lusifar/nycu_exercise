const moment = require('moment');

const { create, read, update } = require('../controllers/process');

const process = async (orderId) => {
  return new Promise((resolve, reject) => {
    const begin = moment();

    setTimeout(async () => {
      const end = moment();

      const data = await create(orderId, begin, end);

      resolve({ processId: data._id });
    }, 3000);
  });
};

const fetch = async (orderId) => {
  return read({ orderId });
};

const complete = async (orderId) => {
  const data = await update({ orderId: orderId }, { complete: true });

  if (data.modifiedCount >= 1) {
    return { ok: true };
  }
  return { ok: false };
};

module.exports = {
  process,
  fetch,
  complete,
};
