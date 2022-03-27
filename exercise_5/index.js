const { domainService } = require('config');

const axios = require('axios');

const gatewayUrl = domainService.gateway.endpoint;

const run = async () => {
  const orderName = process.argv[2];
  const targetName = process.argv[3];

  axios.post(`${gatewayUrl}/api/v1/workflows`, { orderName, targetName }).then(({ data }) => {
    const orderId = data.orderId;

    console.log(`the workflow of orderId: ${orderId} is triggered`);

    // check the result with polling
    const handler = setInterval(async () => {
      const orderRes = await axios.get(`${gatewayUrl}/api/v1/orders/${orderId}`);

      if (orderRes.data.completed) {
        console.log(`the workflow of orderId: ${orderId} is completed`);
        clearInterval(handler);
      } else {
        console.log(`waiting for the completion ...`);
      }
    }, 1000);
  });
};

run();
