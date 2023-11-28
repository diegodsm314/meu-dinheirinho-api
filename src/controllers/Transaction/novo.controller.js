const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const yup = require("yup");
const { TransactionService } = require("../../service");

module.exports = {
    novo: async (req, res) =>{
        try{
            const schema = yup.object().shape({
                userId: yup.number().required(),
                name: yup.string().required(),
                value: yup.number().required(),
                date: yup.string().required(),
                isEntry: yup.bool().required(),
                category: yup.string().required(),
                subCategory: yup.string().required(),
                recurrent: yup.bool().required(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });

              await schema.validate(req.body, {
                stripUnknown: true,
              });

            const { userId, name, value, date, isEntry, category, subCategory, recurrent } = req.body;
            const response = await TransactionService.novo(userId,name,value,date,isEntry,category,subCategory, recurrent)
            return res.status(StatusCodes.OK).json(response);
        }catch (error) {
            console.error(error);
            return res
              .status(
                error.name == "ValidationError"
                  ? StatusCodes.UNPROCESSABLE_ENTITY
                  : error.status || StatusCodes.INTERNAL_SERVER_ERROR
              )
              .json(error.message);
          }
    },
}