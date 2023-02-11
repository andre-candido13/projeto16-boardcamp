import Router from "express"
import { inserirAlugueis } from "../controllers/rentals.js"
import { validateSchema } from "../middleware/validateSchema.js"
import { alugueisJoi } from "../schemas/rentals.js"




const rentalsRouter = Router()



gamesRouter.post("/rentals", validateSchema(alugueisJoi), inserirAlugueis)





export default rentalsRouter