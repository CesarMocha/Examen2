import mongoose from "mongoose";
import Product from "../model/TiendaD.model.js";



export const getAllProducts = async (req, res) => {
    console.log('Obteniendo todos los productos');
    try {
        const products = await Product.find({}, { __v: 0 });
        if (products.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron productos'
            });
        }
        return res.status(200).json({ products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({
            msg: 'Error al obtener los productos'
        });
    }
};


export const getProductById = async (req, res) => {
    console.log('Buscando producto por ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).json({
            msg: 'Error al obtener el producto'
        });
    }
};


export const createProduct = async (req, res) => {
    console.log('Creando nuevo producto');
    const body = req.body;
    const product = new Product(body);
    try {
        const validationError = product.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({ error: errorMessages });
        }
        await product.save();
        return res.status(201).json({ product });
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        return res.status(500).json({
            msg: 'Error al guardar el producto'
        });
    }
};


export const updateProduct = async (req, res) => {
    console.log('Actualizando producto');
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return res.status(500).json({
            msg: 'Error al actualizar el producto'
        });
    }
};


export const deleteProduct = async (req, res) => {
    console.log('Eliminando producto por ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'Producto eliminado'
        });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return res.status(500).json({
            msg: 'Error al eliminar el producto'
        });
    }
};