import Router from "express"
import { inserirCustomers, listarCustomerID, listarCustomers, updateCustomer } from "../controllers/customers.js"




const customersRouter = Router()


customersRouter.post("/customers", inserirCustomers)
customersRouter.get("/customers", listarCustomers)
customersRouter.get("/customers/:id", listarCustomerID)
customersRouter.put("/customers/:id", updateCustomer)





export default customersRouter