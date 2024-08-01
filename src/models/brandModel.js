const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Brand = sequelize.define('Brand', {
    name: { type: DataTypes.STRING, allowNull: false },
    average_price: { type: DataTypes.FLOAT, allowNull: true }
  });

  return Brand;
};