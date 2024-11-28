import { Router } from "express";
import ejemplo from "./ejemplo.routes.js";
import TDeportiva from "./TiendaDeprotiva.routes.js";

const indexRouter = Router()

indexRouter.use('/ejemplos', ejemplo)
indexRouter.use('/TiendaD', TDeportiva)

export default indexRouter