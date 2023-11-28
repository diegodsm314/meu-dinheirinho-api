const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { messages } = require("../../helpers");
const { transacaoRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.novo = async (userId, name, value, date, isEntry, category, subCategory, recurrent) => {

    const novatransacao = {
        userId,
        name,
        value,
        date,
        isEntry,
        category,
        subCategory,
        recurrent,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const inserted = await transacaoRepository.create(novatransacao)

    return inserted
};