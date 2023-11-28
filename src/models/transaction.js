'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    date: DataTypes.STRING,
    isEntry: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    subCategory: DataTypes.STRING,
    recurrent: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  Transaction.associate = function(model) {
    Transaction.belongsTo(model.User, {
      foreignKey: "userId",
      onDelete: "SET NULL"
    })
  }
  return Transaction;
};