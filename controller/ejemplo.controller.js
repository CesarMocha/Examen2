import mongoose from "mongoose";
import Example from "../model/ejmplos.model.js";

export const getAllExamples = async (req, res) => {
    console.log('Obteniendo todos los ejemplos');
    try {
        const examples = await Example.find({}, { __v: 0 });
        if (examples.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron ejemplos'
            });
        }
        return res.status(200).json({
            examples
        });
    } catch (error) {
        console.error('Error al obtener los ejemplos:', error);
        return res.status(500).json({
            msg: 'Error al obtener los ejemplos'
        });
    }
}

export const getExampleById = async (req, res) => {
    console.log('Buscando ejemplo por ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const example = await Example.findById(id);
        if (!example) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }
        return res.status(200).json({
            example
        });
    } catch (error) {
        console.error('Error al obtener el ejemplo:', error);
        return res.status(500).json({
            msg: 'Error al obtener el ejemplo'
        });
    }
}

export const createExample = async (req, res) => {
    console.log('Creando nuevo ejemplo');
    const body = req.body;
    const example = new Example(body);
    try {
        const validationError = example.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await example.save();
        return res.status(201).json({
            example
        });
    } catch (error) {
        console.error('Error al guardar el ejemplo:', error);
        return res.status(500).json({
            msg: 'Error al guardar el ejemplo'
        });
    }
}

export const updateExample = async (req, res) => {
    console.log('Actualizando ejemplo');
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const example = await Example.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!example) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }

        return res.status(200).json({
            example
        });
    } catch (error) {
        console.error('Error al actualizar el ejemplo:', error);
        return res.status(500).json({
            msg: 'Error al actualizar el ejemplo'
        });
    }
}

export const deleteExample = async (req, res) => {
    console.log('Eliminando ejemplo por ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const example = await Example.findByIdAndDelete(id);
        if (!example) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'Ejemplo eliminado'
        });
    } catch (error) {
        console.error('Error al eliminar el ejemplo:', error);
        return res.status(500).json({
            msg: 'Error al eliminar el ejemplo'
        });
    }
}
