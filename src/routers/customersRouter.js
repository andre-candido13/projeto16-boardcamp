import Router from "express"
import { inserirCustomers, listarCustomerID, listarCustomers, updateCustomer } from "../controllers/customers.js"
import { validateSchema } from "../middleware/validateSchema.js"
import { customersJoi } from "../schemas/customers.js"



const customersRouter = Router()


customersRouter.post("/customers", validateSchema(customersJoi), inserirCustomers)
customersRouter.get("/customers", listarCustomers)
customersRouter.get("/customers/:id", listarCustomerID)
customersRouter.put("/customers/:id", validateSchema(customersJoi), updateCustomer)





export default customersRouter