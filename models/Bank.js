const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bank = sequelize.define('Bank', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(49),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'banks',
  timestamps: false,
});

module.exports = Bank;
