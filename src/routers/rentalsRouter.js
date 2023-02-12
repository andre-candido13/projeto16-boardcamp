import Router from "express"
import { finalizarAluguel, getAlugueis, inserirAlugueis } from "../controllers/rentals.js"
import { validateSchema } from "../middleware/validateSchema.js"
import { alugueisJoi } from "../schemas/rentals.js"




const rentalsRouter = Router()


rentalsRouter.get("/rentals", getAlugueis)
rentalsRouter.post("/rentals", validateSchema(alugueisJoi), inserirAlugueis)
rentalsRouter.post("/rentals/:id/return", finalizarAluguel)





export default rentalsRouter