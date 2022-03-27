const Order = require('../models/order');

const create = async (name) => {
  try {
    if (!name) {
      throw new Error('the required parameters are not existed');
    }

    return Order.create({
      name,
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

    return Order.findOne(filter);
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

    return Order.updateMany(filter, data);
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

    return Order.deleteOne(filter);
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
