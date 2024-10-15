const request = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const app = require('../app'); // O arquivo app.js que configura o Express
const Product = require('../models/ProductModel');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Verifica se já há uma conexão ativa antes de conectar
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterAll(async () => {
    // Desconecta o mongoose após os testes
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Product.deleteMany(); // Limpa a coleção após cada teste
});

describe('Product API', () => {
    it('Deve adicionar um novo produto com imagem', async () => {
        const res = await request(app)
            .post('/produto')
            .field('productName', 'Produto Teste')
            .field('productPrice', 99.99)
            .field('productDescription', 'Descrição do produto teste')
            .attach('productImage', path.resolve(__dirname, './imageProducts/newImage.png'));

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.productName).toBe('Produto Teste');
        expect(res.body.productImage).toBeTruthy();
    });

    it('Deve atualizar um produto existente com uma nova imagem', async () => {
        const product = await Product.create({
            productName: 'Produto Atualizar',
            productPrice: 59.99,
            productDescription: 'Descrição do produto a ser atualizado',
            productImage: 'image.png',
        });

        const res = await request(app)
            .put(`/produto/${product._id}`)
            .field('productName', 'Produto Atualizado')
            .field('productPrice', 69.99)
            .field('productDescription', 'Nova descrição do produto')
            .attach('productImage', path.resolve(__dirname, './imageProducts/updateImage.png'));

        expect(res.statusCode).toEqual(200);
        expect(res.body.productName).toBe('Produto Atualizado');
        expect(res.body.productImage).toBeTruthy();
    });

    it('Deve buscar um produto por ID', async () => {
        const product = await Product.create({
            productName: 'Produto Buscar',
            productPrice: 29.99,
            productDescription: 'Descrição do produto buscar',
            productImage: 'buscarImage.png',
        });

        const res = await request(app).get(`/produto/${product._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.productName).toBe('Produto Buscar');
    });

    it('Deve buscar produtos por nome', async () => {
        await Product.create({
            productName: 'Produto A',
            productPrice: 49.99,
            productDescription: 'Descrição do Produto A',
            productImage: 'imageA.png',
        });

        await Product.create({
            productName: 'Produto B',
            productPrice: 59.99,
            productDescription: 'Descrição do Produto B',
            productImage: 'imageB.png',
        });

        const res = await request(app).get('/produto').query({ productName: 'Produto A' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].productName).toBe('Produto A');
    });

    it('Deve listar todos os produtos', async () => {
        await Product.create({
            productName: 'Produto 1',
            productPrice: 19.99,
            productDescription: 'Descrição do Produto 1',
            productImage: 'produto1.png',
        });

        await Product.create({
            productName: 'Produto 2',
            productPrice: 29.99,
            productDescription: 'Descrição do Produto 2',
            productImage: 'produto2.png',
        });

        const res = await request(app).get('/produtos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(2);
    });

    it('Deve excluir um produto e remover a imagem associada', async () => {
        const product = await Product.create({
            productName: 'Produto Excluir',
            productPrice: 19.99,
            productDescription: 'Descrição do produto a ser excluído',
            productImage: 'excluirImage.png',
        });

        const res = await request(app).delete(`/produto/${product._id}`);
        expect(res.statusCode).toEqual(200);
    });
});
