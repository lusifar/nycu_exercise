const { nats, domainService } = require('config');

const axios = require('axios');

const NATSClient = require('./utilities/natsClient');

const gatewayUrl = domainService.gateway.endpoint;

const run = async () => {
  const orderName = process.argv[2];
  const targetName = process.argv[3];

  const natsClient = NATSClient.instance();
  await natsClient.connect(nats.name, [nats.connection]);

  axios.post(`${gatewayUrl}/api/v1/workflows`, { orderName, targetName }).then(({ data }) => {
    const orderId = data.orderId;

    console.log(`the workflow of orderId: ${orderId} is triggered`);

    natsClient.subscribe(nats.stream, nats.subject, nats.consumer, (msg) => {
      const msgObj = JSON.parse(msg);

      if (msgObj.type === 'order_complete' && msgObj.orderId === orderId) {
        console.log(`the workflow of orderId: ${orderId} is completed`);
      }
    });
  });
};

run();
