const { create, read, update } = require('../controllers/order');

const process = async (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const data = await create(name);

      resolve({ orderId: data._id });
    }, 1000);
  });
};

const fetch = async (orderId) => {
  return read({ _id: orderId });
};

const complete = async (orderId) => {
  const data = await update({ _id: orderId }, { complete: true });

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
