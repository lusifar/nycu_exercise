const { create, read, update } = require('../controllers/order');

const process = async (orderId, target) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const data = await create(orderId, target);

      resolve({ deliverId: data._id });
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
