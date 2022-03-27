const { domainService } = require('config');

const axios = require('axios');

const express = require('express');

const router = express.Router();

const orderUrl = domainService.order.endpoint;
const processUrl = domainService.process.endpoint;
const deliverUrl = domainService.deliver.endpoint;

router.post('/api/v1/orders', async (req, res) => {
  const { data } = await axios.post(`${orderUrl}/api/v1/orders`, req.body);

  return res.status(200).send(data);
});

router.get('/api/v1/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const { data } = await axios.get(`${orderUrl}/api/v1/orders/${orderId}`);

  return res.status(200).send(data);
});

router.patch('/api/v1/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const { data } = await axios.patch(`${orderUrl}/api/v1/orders/${orderId}`);

  return res.status(200).send(data);
});

router.post('/api/v1/processes', async (req, res) => {
  const { data } = await axios.post(`${processUrl}/api/v1/processes`, req.body);

  return res.status(200).send(data);
});

router.get('/api/v1/processes/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const { data } = await axios.get(`${processUrl}/api/v1/processes/${orderId}`);

  return res.status(200).send(data);
});

router.patch('/api/v1/processes/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const { data } = await axios.patch(`${processUrl}/api/v1/processes/${orderId}`);

  return res.status(200).send(data);
});

router.post('/api/v1/delivers', async (req, res) => {
  const { data } = await axios.post(`${deliverUrl}/api/v1/delivers`, req.body);

  return res.status(200).send(data);
});

router.get('/api/v1/delivers/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const { data } = await axios.get(`${deliverUrl}/api/v1/delivers/${orderId}`);

  return res.status(200).send(data);
});

router.patch('/api/v1/delivers/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const { data } = await axios.patch(`${deliverUrl}/api/v1/delivers/${orderId}`);

  return res.status(200).send(data);
});

router.post('/api/v1/workflows', async (req, res) => {
  const { orderName, targetName } = req.body;

  // make order
  const orderRes = await axios.post(`${orderUrl}/api/v1/orders`, {
    name: orderName,
  });

  const orderId = orderRes.data.orderId;

  // make process
  const job = axios
    .post(`${processUrl}/api/v1/processes`, {
      orderId,
    })
    .then(() => {
      // make delievr
      return axios.post(`${deliverUrl}/api/v1/delivers`, {
        orderId,
        target: targetName,
      });
    })
    .then(() => {
      // complete deliver
      return axios.patch(`${deliverUrl}/api/v1/delivers/${orderId}`);
    })
    .then(() => {
      // complete process
      return axios.patch(`${processUrl}/api/v1/processes/${orderId}`);
    })
    .then(() => {
      // complete order
      return axios.patch(`${orderUrl}/api/v1/orders/${orderId}`);
    });

  return res.status(200).send({
    orderId,
    job,
  });
});

module.exports = router;
