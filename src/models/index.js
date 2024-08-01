const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Model = require('./modelModel')(sequelize);
const Brand = require('./brandModel')(sequelize);

// Definir relaciones
Model.belongsTo(Brand, { foreignKey: 'brand_id', onDelete: 'SET NULL' });
Brand.hasMany(Model, { as: 'Models', foreignKey: 'brand_id' });

module.exports = { sequelize, Model, Brand };