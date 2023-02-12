import { db } from "../database/database.connection.js"


export async function getAlugueis (req, res) {

    try{


const alugueis = await db.query(`WITH rental_game_customer AS (SELECT rentals.id, rentals."customerId", rentals."gameId",
rentals."rentDate", rentals."daysRented", rentals."returnDate", rentals."originalPrice", rentals."delayFee", 
customers.id AS customer_id, customers.name AS customer_name, games.id AS game_id, games.name AS game_name
FROM rentals
JOIN customers ON rentals."customerId" = customers.id
JOIN games ON rentals."gameId" = games.id)
SELECT * FROM (SELECT id, "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee",
json_build_object('id', customer_id, 'name', customer_name) AS customer,
json_build_object('id', game_id, 'name', game_name) AS game 
FROM rental_game_customer) rental_game_customer;
`)

console.log(alugueis.rows)
        res.status(200).send(alugueis.rows)

    } catch (err) {
       res.status(500).send(err.message) 
    }

}




export async function inserirAlugueis (req, res) {

const { customerId, gameId, daysRented } = req.body

try {

const customerExistente = await db.query(`SELECT * FROM customers WHERE id=$1`,
([customerId]))

if (customerExistente.rowCount < 1)
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
return res.status(201).send("OK")

} catch (err) {
    res.status(500).send(err.message)

}
}


export async function finalizarAluguel (req, res) {

    const { id } = req.params
    
    const dataAtual = new Date();
    const retornoALuguel = dataAtual.toISOString().split("T")[0];
    
    try {
    
    const aluguelExistente = await db.query(`SELECT * FROM rentals WHERE id=$1`,
    ([id]))
    
    if (aluguelExistente.rows.length === 0) {
        return res.status(400).send("Aluguel não encontrado!")
    }
    
    const aluguel = aluguelExistente.rows[0]
    
    if (aluguel.returnDate !== null) {
        return res.status(400).send("Aluguel disponivel")
    }
    
    const dataAluguel = new Date(check.dataAluguel);
    const diasAlugados = check.diasAlugados;
    const devolucao = new Date(devolucao);
    const tempoAlugado = Math.abs(devolucao.getTime() - dataAluguel.getTime());
    const tempoGasto = Math.ceil(tempoAlugado / (1000 * 3600 * 24));
    const atraso = tempoGasto- diasAlugados;
    let delayFee = 0;
    if (atraso > 0) {
      const game = await db.query('SELECT * FROM games WHERE id = $1', [
        check.gameId,
      ]);
      
      const { pricePerDay } = game.rows[0]
      delayFee = atraso * pricePerDay;
    }
    
    const update = await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3 `,
    ([returnDate, delayFee, id]))
    
    return res.status(200).send("OK")
    
    } catch (err) {
        res.status(500).send(err.message)
    }
    
    }


    export async function deletarAluguel (req, res) {

      const { id } = req.params

      try {

        const selec = await db.query(`SELECT * FROM rentals WHERE id= $1`,
        ([id]))

        if (selec.rowCount === 0 ) {
          return res.status(404).send("Aluguel não encontrado")
        }

        if (selec.rows[0].returnDate) {
          return res.status(400).send("Jogo consta alugado")

        }

        const deleteAluguel = await db.query(`DELETE FROM rentals WHERE id= $1`,
        ([id]))
        res.status(200).send("DELETADO")









      } catch (err) {
        res.status(500).send(err.message)
      }

    }
    