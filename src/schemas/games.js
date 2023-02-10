import joi from "joi"



export const gameJoi = joi.object({

name: joi.string().required(),
image: joi.string().required(),
stockTotal: joi.number().positive().required(),
pricePerday: joi.number().positive().required()

})



