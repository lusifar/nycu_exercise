module.exports = {
  mongodb: {
    connection: 'mongodb://127.0.0.1:27017/test',
    username: 'userAdmin',
    password: 'test1234',
  },
  nats: {
    connection: '127.0.0.1:4222',
    name: 'testbed',
    stream: 'testbed_stream',
    subject: 'testbed_subject',
    consumer: 'testbed_consumer',
  },
  domainService: {
    order: {
      endpoint: 'http://127.0.0.1:3030',
      port: 3030,
    },
    process: {
      endpoint: 'http://127.0.0.1:3031',
      port: 3031,
    },
    deliver: {
      endpoint: 'http://127.0.0.1:3032',
      port: 3032,
    },
    gateway: {
      endpoint: 'http://127.0.0.1:3033',
      port: 3033,
    },
  },
};
