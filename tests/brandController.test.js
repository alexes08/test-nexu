const { Brand } = require('../src/models');
const brandController = require('../src/controllers/brandController');

// Mock de la respuesta y la solicitud
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (data) => {
  return {
    body: data
  };
};

describe('Brand Controller', () => {
  it('should create a new brand', async () => {
    const req = mockRequest({ name: 'Toyota' });
    const res = mockResponse();

    // Mock de la función create de Sequelize
    Brand.create = jest.fn().mockResolvedValue(req.body);

    await brandController.createBrand(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should not create a brand if name already exists', async () => {
    const req = mockRequest({ name: 'Toyota' });
    const res = mockResponse();

    // Mock de la función findOne de Sequelize
    Brand.findOne = jest.fn().mockResolvedValue(req.body);

    await brandController.createBrand(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Brand name already exists' });
  });
});