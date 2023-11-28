const { Transaction } = require("../models");

module.exports = {
  list: (query) => Transaction.findAndCountAll(query),
  getById: (id) => Transaction.findByPk(id),
  get: (params) => Transaction.findOne({ where: params }),
  create: (params) => Transaction.create(params),
  update: (transaction) => transaction.save(),
  destroy: (id) => Transaction.destroy({ where: { id } }),
};
