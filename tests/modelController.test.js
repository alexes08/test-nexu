const { Model } = require('../src/models');
const modelController = require('../src/controllers/modelController');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (params, body) => {
  return {
    params,
    body
  };
};

describe('Model Controller', () => {
  it('should update the average price of a model', async () => {
    const req = mockRequest({ id: 1 }, { average_price: 406400 });
    const res = mockResponse();

    // Mock de la función findByPk de Sequelize
    Model.findByPk = jest.fn().mockResolvedValue({
      id: 1,
      name: 'xlt',
      year: 2021,
      average_price: 100000,
      save: jest.fn().mockResolvedValue(true)
    });

    await modelController.updateModel(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ average_price: 406400 }));
  });

  it('should return an error if average price is less than or equal to 100,000', async () => {
    const req = mockRequest({ id: 1 }, { average_price: 90000 });
    const res = mockResponse();

    await modelController.updateModel(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Average price must be greater than 100,000' });
  });

  it('should return an error if model is not found', async () => {
    const req = mockRequest({ id: 1 }, { average_price: 406400 });
    const res = mockResponse();

    // Mock de la función findByPk de Sequelize para que devuelva null
    Model.findByPk = jest.fn().mockResolvedValue(null);

    await modelController.updateModel(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Model not found' });
  });
});