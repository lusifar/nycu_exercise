const Process = require('../models/process');

const create = async (orderId, begin, end) => {
  try {
    if (!orderId || !begin || !end) {
      throw new Error('the required parameters are not existed');
    }

    const period = end.diff(begin, 'seconds');

    return Process.create({
      orderId,
      begin,
      end,
      period,
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

    return Process.findOne(filter);
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

    return Process.updateMany(filter, data);
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

    return Process.deleteOne(filter);
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
