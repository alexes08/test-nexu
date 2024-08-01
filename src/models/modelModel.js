const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Model = sequelize.define('Model', {
    name: { type: DataTypes.STRING, allowNull: false },
    average_price: { type: DataTypes.FLOAT, allowNull: true },
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Brands',
        key: 'id'
      },
      allowNull: true
    }
  });

  return Model;
};