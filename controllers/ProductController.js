const Product = require('../models/ProductModel');
const path = require('path');
const fs = require('fs');

// Função auxiliar para excluir a imagem
const deleteImage = (imagePath) => {
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(`Erro ao excluir a imagem: ${err.message}`);
        } else {
            console.log(`Imagem excluída com sucesso: ${imagePath}`);
        }
    });
};

// Adicionar produto com upload de imagem
exports.addProduct = async (req, res) => {
    try {
        const { productName, productPrice, productDescription } = req.body;
        const productImage = req.file ? req.file.filename : null;

        if (!productImage) {
            return res.status(400).json({ message: 'Imagem do produto é obrigatória' });
        }

        const newProduct = await Product.create({
            productName,
            productImage,
            productPrice,
            productDescription,
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
};

// Atualizar produto por ID, excluindo imagem antiga se houver
exports.updateProduct = async (req, res) => {
    try {
        // Encontra o produto no banco de dados
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

        // Verifica se há uma nova imagem para upload
        if (req.file) {
            // Define o caminho da imagem antiga
            const oldImagePath = path.resolve(__dirname, '..', 'public', 'uploads', 'imageProducts', product.productImage);

            // Exclui a imagem antiga, se ela existir
            if (fs.existsSync(oldImagePath)) {
                deleteImage(oldImagePath);
            }

            // Atualiza o campo da imagem com a nova imagem enviada
            req.body.productImage = req.file.filename;
        }

        // Atualiza o produto no banco de dados
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
};

// Buscar produto por nome
exports.getProductByName = async (req, res) => {
    try {
        const products = await Product.find({ productName: req.query.productName });
        if (products.length === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado' });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error('Erro ao buscar produto por nome:', err);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error('Erro ao buscar produto por ID:', err);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
};

// Listar todos os produtos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Erro ao listar produtos:', err);
        res.status(500).json({ message: 'Erro ao listar produtos' });
    }
};

// Excluir produto por ID e remover imagem associada
exports.deleteProduct = async (req, res) => {
    try {
        // Encontra o produto no banco de dados
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

        // Constrói o caminho completo para a imagem do produto
        if (product.productImage) {
            const imagePath = path.resolve(__dirname, '..', 'public', 'uploads', 'imageProducts', product.productImage);

            // Exclui a imagem associada ao produto, se ela existir
            if (fs.existsSync(imagePath)) {
                deleteImage(imagePath);
            } else {
                console.warn(`Imagem não encontrada: ${imagePath}`);
            }
        }

        // Exclui o produto do banco de dados
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir produto:', err);
        res.status(500).json({ message: 'Erro ao excluir produto' });
    }
};
