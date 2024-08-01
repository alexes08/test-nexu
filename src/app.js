const express = require('express');
const modelRoutes = require('./routes/modelRoutes');
const brandRoutes = require('./routes/brandRoutes');

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/models', modelRoutes);
app.use('/api/brands', brandRoutes);

module.exports = app;