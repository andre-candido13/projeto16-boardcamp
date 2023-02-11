import joi from "joi"



export const customersJoi = joi.object({

  name: joi.string().empty().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().pattern(/^[0-9]+$/).length(11).required(),
  birthday: joi.date().max('now').required()
  })


