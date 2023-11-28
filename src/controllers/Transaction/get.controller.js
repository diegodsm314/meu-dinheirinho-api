const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken");
const { TransactionService } = require("../../service");
const yup = require("yup");

module.exports = {
    get: async (req, res) =>{
        try{
            const schema = yup.object().shape({
                userId: yup.number().required(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });

            const { userId } = req.body;
            const response = await TransactionService.get(userId);
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