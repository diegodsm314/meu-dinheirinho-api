const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { messages } = require("../../helpers");
const { clientesRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.novo = async (nome, email, senha) => {
    const user = await clientesRepository.get({ email });

    if(!user){
        const novo_user = {
            name: nome,
            email,
            password: senha,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        
        await clientesRepository.create(novo_user);
    } 
    else {
        user.name = nome;
        user.email = email;
        user.password = senha;
        user.updatedAt = new Date();

        await clientesRepository.update(user);
    }

    const inserted = await clientesRepository.get({ email });

    const payload = {
        userId: inserted.id,
        email: inserted.email,
    }
  
    return { payload };
};