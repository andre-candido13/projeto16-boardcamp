import joi from "joi"




export const alugueisJoi = joi.object({

customerId: joi.number().positive().required(),
gameId: joi.number().positive().required(),
daysRented: joi.number().positive().required()

})