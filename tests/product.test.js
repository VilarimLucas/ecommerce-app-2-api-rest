// tests/product.test.js
const { mockDeep } = require('jest-mock-extended');
const Product = require('../models/ProductModel'); // Importa o modelo de produto
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app'); // Importa o app

// Mocka o Mongoose e as funções do modelo
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn().mockReturnThis(),
  Schema: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
}));

describe('Testes da API de Produtos', () => {

  // Teste para adicionar um produto
  it('Deve adicionar um produto', async () => {
    const mockProduct = {
      _id: 'productId123',
      productName: 'Produto Teste',
      productImage: 'http://example.com/image.png',
      productPrice: 100,
      productDescription: 'Descrição do produto teste',
    };

    mongoose.create.mockResolvedValue(mockProduct);

    const res = await request(app).post('/produto').send(mockProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('productName', mockProduct.productName);
  });

  // Teste para atualizar um produto por ID
  it('Deve atualizar um produto por ID', async () => {
    const mockProduct = {
      _id: 'productId123',
      productName: 'Produto Atualizado',
      productImage: 'http://example.com/imageAtualizado.png',
      productPrice: 200,
      productDescription: 'Descrição do produto atualizado',
    };

    mongoose.findByIdAndUpdate.mockResolvedValue(mockProduct);

    const res = await request(app)
      .put(`/produto/${mockProduct._id}`)
      .send({ productName: 'Produto Atualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('productName', 'Produto Atualizado');
  });

  // Teste para buscar um produto por productName
  it('Deve buscar um produto por productName', async () => {
    const mockProduct = {
      _id: 'productId123',
      productName: 'Produto Teste',
      productImage: 'http://example.com/image.png',
      productPrice: 100,
      productDescription: 'Descrição do produto teste',
    };

    mongoose.find.mockResolvedValue([mockProduct]);

    const res = await request(app)
      .get(`/produto?productName=${mockProduct.productName}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty('productName', mockProduct.productName);
  });

  // Teste para buscar um produto por ID
  it('Deve buscar um produto por ID', async () => {
    const mockProduct = {
      _id: 'productId123',
      productName: 'Produto Teste',
      productImage: 'http://example.com/image.png',
      productPrice: 100,
      productDescription: 'Descrição do produto teste',
    };

    mongoose.findById.mockResolvedValue(mockProduct);

    const res = await request(app).get(`/produto/${mockProduct._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('productName', mockProduct.productName);
  });

    // Teste para listar todos os produtos
    it('Deve listar todos os produtos', async () => {
        const mockProducts = [
          {
            _id: 'productId123',
            productName: 'Produto 1',
            productImage: 'http://example.com/image1.png',
            productPrice: 100,
            productDescription: 'Descrição do produto 1',
          },
          {
            _id: 'productId124',
            productName: 'Produto 2',
            productImage: 'http://example.com/image2.png',
            productPrice: 200,
            productDescription: 'Descrição do produto 2',
          },
        ];
    
        mongoose.find.mockResolvedValue(mockProducts);
    
        const res = await request(app).get('/produtos'); // Note que a rota correta é '/produtos'
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2); // Espera 2 produtos na resposta
        expect(res.body[0]).toHaveProperty('productName', 'Produto 1');
        expect(res.body[1]).toHaveProperty('productName', 'Produto 2');
      });
    
      // Teste para excluir um produto por ID
      it('Deve excluir um produto por ID', async () => {
        const mockProduct = {
          _id: 'productId123',
          productName: 'Produto Teste',
          productImage: 'http://example.com/image.png',
          productPrice: 100,
          productDescription: 'Descrição do produto teste',
        };
    
        mongoose.findByIdAndDelete.mockResolvedValue(mockProduct);
    
        const res = await request(app).delete(`/produto/${mockProduct._id}`);
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Produto excluído com sucesso');
      });
    });
    