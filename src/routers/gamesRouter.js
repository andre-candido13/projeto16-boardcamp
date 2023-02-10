import Router from "express"
import { buscarGames, criarGames } from "../controllers/games.js"



const gamesRouter = Router()


gamesRouter.get("/games", buscarGames)
gamesRouter.post("/games", criarGames)





export default gamesRouter