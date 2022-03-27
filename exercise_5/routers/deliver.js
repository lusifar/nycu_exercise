const express = require('express');

const deliverUtil = require('../controllers/deliver');

const router = express.Router();

router.post('/api/v1/delivers', async (req, res) => {
  const { orderId, target } = req.body;

  const data = await deliverUtil.process(orderId, target);

  return res.status(200).send(data);
});

router.get('/api/v1/delivers/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const data = await deliverUtil.fetch(orderId);

  return res.status(200).send(data);
});

router.patch('/api/v1/delivers/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const data = await deliverUtil.complete(orderId);

  return res.status(200).send(data);
});

module.exports = router;
