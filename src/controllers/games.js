import { db } from "../database/database.connection.js"


export async function criarGames (req, res) {

const { name, image, stockTotal, pricePerDay} = req.body

try {

    const gameRepetido = await db.query(`SELECT "name" FROM games WHERE "name" = $1`, [name])

    if (gameRepetido.rowCount !== 0) {
        return res.status(409).send("Game Repetido!")
    }

    const criar = await db.query(`INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES($1, $2, $3, $4);`
    ,([name, image, stockTotal, pricePerDay]))

    return res.status(201).send(criar)

} catch (err) {
    res.status(500).send(err.message)

}
}

export async function buscarGames (req, res) {

try {
   
    const games = await db.query("SELECT * FROM games")
    return res.status(200).send(games.rows)


} catch (err) {
    res.status(500).send(err.message)
}

}