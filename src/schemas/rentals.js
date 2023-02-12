import joi from "joi"




export const alugueisJoi = joi.object({

        customerId: joi.number().positive().integer().required(),
        gameId: joi.number().positive().integer().required(),
        daysRented: joi.number().positive().integer().required(),
      });
      

