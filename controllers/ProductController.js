// controllers/ProductController.js
const Product = require('../models/ProductModel');

// Adicionar produto
exports.addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao adicionar produto' });
    }
};

// Atualizar produto por ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar produto' });
    }
};

// Buscar produto por productName
exports.getProductByName = async (req, res) => {
    try {
        const products = await Product.find({ productName: req.query.productName });
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao buscar produto' });
    }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao buscar produto' });
    }
};

// Listar todos os produtos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao listar produtos' });
    }
};

// Excluir produto por ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao excluir produto' });
    }
};
