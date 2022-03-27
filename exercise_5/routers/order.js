const express = require('express');

const orderUtil = require('../controllers/order');

const router = express.Router();

router.post('/api/v1/orders', async (req, res) => {
  const { name } = req.body;

  const data = await orderUtil.process(name);

  return res.status(200).send(data);
});

router.get('/api/v1/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const data = await orderUtil.fetch(orderId);

  return res.status(200).send(data);
});

router.patch('/api/v1/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const data = await orderUtil.complete(orderId);

  return res.status(200).send(data);
});

module.exports = router;
