const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { clientesRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.login = async (email, senha) => {
  const user = await clientesRepository.get({ email });

  if (!user) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound("client"),
    };
  }

  const valido = await encryptor.comparePassword(senha, user.senha);
  if (!valido) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: messages.invalidPassword,
    };
  }

  const payload = {
    id: user.id,
    email: user.email,
    userId: user.userId,
    logged: true,
  };

  return { payload };
};
