const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors'); // Importa o middleware de CORS
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Habilita CORS para todas as rotas
app.use(cors());

app.use(express.json()); // Middleware para interpretar JSON

// Conectar ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerra o processo com falha
  }
};
connectDB();

// Definições do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos',
    },
    servers: [
      {
        url: 'http://localhost:4040', // Atualize aqui para refletir a porta 4040
      },
    ],
  },
  apis: ['./routes.js'], // Caminho para o arquivo que contém as anotações de rota
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Middleware para servir imagens estáticas
app.use('/images', express.static('public/uploads/imageProducts'));

// Usar as rotas definidas no arquivo routes.js
app.use(routes);

module.exports = app;
