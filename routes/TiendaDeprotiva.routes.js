import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controller/TiendaD.controller.js";

const TDeportiva = Router();

TDeportiva.get('/', getAllProducts)
TDeportiva.get('/:id', getProductById)
TDeportiva.post('/', createProduct)
TDeportiva.put('/:id', updateProduct)
TDeportiva.delete('/:id', deleteProduct)

export default TDeportiva;
