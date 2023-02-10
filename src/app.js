import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gamesRouter from "./routers/gamesRouter.js"
import customersRouter from "./routers/customersRouter.js"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())




//routes
app.use([ gamesRouter, customersRouter ])


app.listen(5000, () => console.log("Servidor ON na porta", + 5000))