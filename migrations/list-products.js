// migrations/list-products.js
const mongoose = require('mongoose');
const Product = require('../models/ProductModel'); // Importa o modelo de produto
const connectDB = require('../db'); // Função de conexão

const listProducts = async () => {
  try {
    await connectDB(); // Conecta ao MongoDB
    
    // Lista todos os produtos
    const products = await Product.find();
    console.log('Produtos:');
    console.log(products);
    
    process.exit(0); // Encerra o processo com sucesso
  } catch (err) {
    console.error('Erro ao listar produtos:', err.message);
    process.exit(1); // Encerra o processo com erro
  }
};

listProducts();
