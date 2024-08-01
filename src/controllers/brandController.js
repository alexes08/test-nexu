const { Brand, Model } = require('../models');

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBrand = async (req, res) => {
  const { name } = req.body;
  
  try {
    const existingBrand = await Brand.findOne({ where: { name } });
    if (existingBrand) {
      return res.status(400).json({ message: 'Brand name already exists' });
    }

    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getModelsByBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id, {
      include: { model: Model, as: 'Models' }
    });
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(brand.Models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createModelForBrand = async (req, res) => {
  const { id } = req.params;
  const { name, average_price } = req.body;

  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    if(!name){
      return res.status(400).json({ message: 'Model name is required' });
    }

    const existingModel = await Model.findOne({ where: { name, brand_id: id } });
    if (existingModel) {
      return res.status(400).json({ message: 'Model name already exists for this brand' });
    }

    if (average_price && average_price <= 100000) {
      return res.status(400).json({ message: 'Average price must be greater than 100,000' });
    }

    const model = await Model.create({ name, average_price, brand_id: id });
    res.status(201).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};