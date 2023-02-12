import Router from "express"
import { getAlugueis, inserirAlugueis } from "../controllers/rentals.js"
import { validateSchema } from "../middleware/validateSchema.js"
import { alugueisJoi } from "../schemas/rentals.js"




const rentalsRouter = Router()


rentalsRouter.get("/rentals", getAlugueis)
rentalsRouter.post("/rentals", validateSchema(alugueisJoi), inserirAlugueis)





export default rentalsRouter