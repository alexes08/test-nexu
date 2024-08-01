const { Model, Brand } = require('../models');
const { Op } = require('sequelize');

exports.getAllModels = async (req, res) => {
  const { greater, lower } = req.query;
  const whereClause = {};

  if (greater) {
    whereClause.average_price = { [Op.gt]: greater };
  }

  if (lower) {
    whereClause.average_price = { ...whereClause.average_price, [Op.lt]: lower };
  }

  try {
    if(greater && lower){
      const models = await Model.findAll({ where: whereClause, include: 'Brand' });
      res.status(200).json(models);
    }
    const models = await Model.findAll({ include: Brand });
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createModel = async (req, res) => {
  try {
    const model = await Model.create(req.body);
    res.status(201).json(model);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateModel = async (req, res) => {
  const { id } = req.params;
  const { average_price } = req.body;

  try {
    const model = await Model.findByPk(id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }

    if (average_price && average_price <= 100000) {
      return res.status(400).json({ message: 'Average price must be greater than 100,000' });
    }

    model.average_price = average_price;
    await model.save();

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
