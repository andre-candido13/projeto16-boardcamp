import Router from "express"
import { buscarGames, criarGames } from "../controllers/games.js"
import { validateSchema } from "../middleware/validateSchema.js"
import { gameJoi } from "../schemas/games.js"



const gamesRouter = Router()


gamesRouter.get("/games", buscarGames)
gamesRouter.post("/games", validateSchema(gameJoi), criarGames)





export default gamesRouter