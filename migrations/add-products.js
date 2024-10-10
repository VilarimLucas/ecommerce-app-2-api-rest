// migrations/add-products.js
const mongoose = require('mongoose');
const Product = require('../models/ProductModel'); // Importa o modelo
const Migration = require('../models/MigrationModel'); // Importa o modelo de migração
const connectDB = require('../db'); // Função de conexão com o banco de dados

const runMigration = async () => {
  try {
    await connectDB(); // Conecta ao MongoDB
    
    // Adiciona um novo produto
    const newProduct = new Product({
      productName: 'Produto Exemplo',
      productImage: 'http://example.com/image.png',
      productPrice: 99.99,
      productDescription: 'Este é um produto de exemplo',
    });
    
    await newProduct.save(); // Salva o produto no banco de dados
    console.log('Produto adicionado com sucesso!');

    // Após salvar o produto, registre a migração
    const migrationName = 'add-products';
    const existingMigration = await Migration.findOne({ migrationName });

    if (!existingMigration) {
      const migration = new Migration({ migrationName });
      await migration.save();
      console.log(`Migração ${migrationName} registrada!`);
    } else {
      console.log(`Migração ${migrationName} já foi aplicada!`);
    }

    process.exit(0); // Encerra o processo com sucesso
  } catch (err) {
    console.error('Erro ao aplicar migração:', err.message);
    process.exit(1); // Encerra o processo com erro
  }
};

runMigration();
