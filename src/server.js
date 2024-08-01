const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

let server;

// Conectar a la base de datos y luego iniciar el servidor
sequelize.sync({ force: true }).then(() => {
  console.log('Conectado a la base de datos');
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar a la base de datos', err);
});

const gracefulShutdown = async () => {
  console.log('Cerrando conexiones de Sequelize...');
  await sequelize.close();
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);