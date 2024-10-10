const swaggerJsDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

// Definir as opções do Swagger
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
        url: 'http://localhost:4040', // Ajuste para a sua porta
      },
    ],
  },
  apis: ['./routes.js'], // Caminho para o arquivo que contém as anotações de rota
};

// Gerar o swagger.json
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Salvar o arquivo swagger.json
fs.writeFileSync(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2), 'utf8');
console.log('swagger.json gerado com sucesso!');
