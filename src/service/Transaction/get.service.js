const { transacaoRepository } = require("../../repositories");

module.exports.get = async (userId) => {
  const response = await transacaoRepository.list({ where: {userId}, raw:true });

  return response;
};
