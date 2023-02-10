import joi from "joi"



export const customersJoi = joi.object({

    name: joi.string().required(),
    cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
    phone: joi.number().pattern(/^[0-9]{10,11}$/),
    birthday: joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) 

})