const express = require('express');

const processUtil = require('../controllers/process');

const router = express.Router();

router.post('/api/v1/processes', async (req, res) => {
  const { orderId } = req.body;

  const data = await processUtil.process(orderId);

  return res.status(200).send(data);
});

router.get('/api/v1/processes/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const data = await processUtil.fetch(orderId);

  return res.status(200).send(data);
});

router.patch('/api/v1/processes/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const data = await processUtil.complete(orderId);

  return res.status(200).send(data);
});

module.exports = router;
