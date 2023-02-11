import { db } from "../database/database.connection.js"



export async function inserirAlugueis (req, res) {

const { customerId, gameId, daysRented } = req.body

try {

const customerExistente = await db.query(`SELECT * FROM customers WHERE id=$1`,
([customerId]))

if (customerExistente < 1)
return res.status(400).send("Cliente não existente")

const gameExistente = await db.query(`SELECT * FROM games WHERE id=$1`,
([gameId]))

if (gameExistente.rowCount < 1)
return res.status(400).send("Game não existente")

const diasAlugados = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" is null `,
([gameId]))

if (diasAlugados.rowCount >= gameExistente.rows[0].stocktotal)
return res.status(400).send("Estoque indisponivel")

const inserir = await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", 
"originalPrice") VALUES ($1, $2, Now(), $3, $4)`, ([customerId, gameId, daysRented, gameExistente.rows[0].pricePerDay * daysRented]))
return res.status(201)

} catch (err) {
    res.status(500).send(err.message)

}
}
