const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Bank = require('./Bank');

const Branch = sequelize.define('Branch', {
  ifsc: {
    type: DataTypes.STRING(11),
    primaryKey: true,
  },
  branch: {
    type: DataTypes.STRING(74),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(195),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(26),
    allowNull: false,
  },
}, {
  tableName: 'branches',
  timestamps: false,
});

Branch.belongsTo(Bank, { foreignKey: 'bankId', onDelete: 'CASCADE' });
Bank.hasMany(Branch, { foreignKey: 'bankId' });

module.exports = Branch;
