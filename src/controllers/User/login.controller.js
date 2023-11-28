const { StatusCodes } = require("http-status-codes");
const { ClienteService } = require("../../service");
const yup = require("yup");

module.exports = {
    login: async (req, res) =>{
        try{
            const schema = yup.object().shape({
                email: yup.string().required(),
                senha: yup.string().required(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });

            const { email, senha } = req.body;
            const response = await ClienteService.login(email, senha);
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