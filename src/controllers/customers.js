import { db } from "../database/database.connection.js" 



export async function inserirCustomers (req, res) {


const { name, phone, cpf, birthday } = req.body

try {

    const cpfRepetido = await db.query(`SELECT "cpf" FROM customers WHERE "cpf" = $1`, [cpf])

    if (cpfRepetido.rowCount !== 0) {
        return res.status(409).send("CPF já existente")
    }

    const listar = await db.query(`INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES
    ($1, $2, $3, $4);`
    , ([name, phone, cpf, birthday]))
    return res.status(201).send(listar)

} catch (err) {
    res.status(500).send(err.message)
}
}

export async function listarCustomers (req, res) {

    try {

        const listar = await db.query(`SELECT * FROM customers`)
        return res.status(201)


    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function listarCustomerID (req, res) {

    const { id } = req.params

    try {

        const customerID = await db.query(` SELECT * FROM customers WHERE id= ${id} ;`)
            
        if (customerID.rowCount < 1) 
        return res.status(401).send("Cliente não encontrado!")
        

        return res.send(customerID.rows)

        
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function updateCustomer (req, res) {

const { id } = req.params
const { name, phone, cpf, birthday} = req.body

try {

    const cpfRepetido = await db.query(`SELECT cpf FROM customers WHERE cpf = $1 AND id <> $2;`,
    ([cpf, id]))

    if (cpfRepetido.rowCount !==0)
    return res.status(409).send("CPF já existente")

    const update = await db.query(`UPDATE "customers" SET "name"= $1, "phone"=$2, "cpf"=$3, "birthday"=$4
    WHERE "id"=$5`,
    ([name, phone, cpf, birthday, id]))
    return res.status(200).send("OK")

} catch (err) {
    res.status(500).send(err.message)
}
}
