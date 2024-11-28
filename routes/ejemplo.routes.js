import { Router } from "express";
import { createExample,
    getAllExamples,
    getExampleById,
    updateExample,
    deleteExample
} from "../controller/ejemplo.controller.js";
const ejemplo = Router()

ejemplo.get('/', getAllExamples)
ejemplo.get('/:id', getExampleById)
ejemplo.post('/', createExample)
ejemplo.put('/:id', updateExample)
ejemplo.delete('/:id', deleteExample)

export default ejemplo