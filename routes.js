const express = require('express');
const router = express.Router();
const ProductController = require('./controllers/ProductController');
const upload = require('./middlewares/uploadConfig'); // Middleware de upload

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - productPrice
 *         - productDescription
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do produto
 *         productName:
 *           type: string
 *           description: Nome do produto
 *         productImage:
 *           type: string
 *           description: Nome da imagem do produto
 *         productPrice:
 *           type: number
 *           description: Preço do produto
 *         productDescription:
 *           type: string
 *           description: Descrição do produto
 *       example:
 *         productName: "Produto Exemplo"
 *         productImage: "image.png"
 *         productPrice: 99.99
 *         productDescription: "Este é um produto de exemplo"
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Adiciona um novo produto com upload de imagem
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productDescription:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro ao adicionar produto
 */
router.post('/produto', upload.single('productImage'), ProductController.addProduct);

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto por ID com upload de nova imagem
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productDescription:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.put('/produto/:id', upload.single('productImage'), ProductController.updateProduct);

/**
 * @swagger
 * /produto:
 *   get:
 *     summary: Busca um produto pelo nome
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *         description: Nome do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro ao buscar produto
 */
router.get('/produto', ProductController.getProductByName);

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/produto/:id', ProductController.getProductById);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/produtos', ProductController.getAllProducts);

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     summary: Exclui um produto por ID e remove sua imagem
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/produto/:id', ProductController.deleteProduct);

module.exports = router;
