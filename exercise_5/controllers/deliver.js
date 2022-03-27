const Deliver = require('../models/deliver');

const create = async (orderId, target) => {
  try {
    if (!orderId || !target) {
      throw new Error('the required parameters are not existed');
    }

    return Deliver.create({
      orderId,
      target,
      completed: false,
    });
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

const read = async (filter) => {
  try {
    if (!filter) {
      throw new Error('the required parameters are not existed');
    }

    return Deliver.findOne(filter);
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

const update = async (filter, data) => {
  try {
    if (!filter || !data) {
      throw new Error('the required parameters are not existed');
    }

    return Deliver.updateMany(filter, data);
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

const destroy = async (filter) => {
  try {
    if (!filter) {
      throw new Error('the required parameters are not existed');
    }

    return Deliver.deleteOne(filter);
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

module.exports = {
  create,
  read,
  update,
  destroy,
};
