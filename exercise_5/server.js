const { domainService } = require('config');

const dbClient = require('./utilities/db');

const orderApp = require('./apps/order');
const processApp = require('./apps/process');
const deliverApp = require('./apps/deliver');
const gatewayApp = require('./apps/gateway');

const run = async () => {
  await dbClient.init();

  orderApp.listen(domainService.order.port, async () => {
    console.log(`the order app is running on port ${domainService.order.port}`);
  });

  processApp.listen(domainService.process.port, async () => {
    console.log(`the process app is running on port ${domainService.process.port}`);
  });

  deliverApp.listen(domainService.deliver.port, async () => {
    console.log(`the deliver app is running on port ${domainService.deliver.port}`);
  });

  gatewayApp.listen(domainService.gateway.port, async () => {
    console.log(`the gateway app is running on port ${domainService.gateway.port}`);
  });
};

process.on('SIGINT', async () => {
  await dbClient.deinit();

  console.log('the whole services are terminated');

  process.exit(1);
});

run();
