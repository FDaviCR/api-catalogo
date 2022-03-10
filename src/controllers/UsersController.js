const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/Users");


module.exports = {
    async createUser( request, response){
        const { user, password } = request.body;

        console.log(user + password);
        let salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const exists = await User.findOne({
                where: {login: user}
            });

            if (!exists){
                User.create({
                    login: user,
                    password: hash
                });
                return response.status(200).send({msg: 'Usuário cadastrado com sucesso.'});
            } else {
                return response.status(401).send({msg: 'O usuário já existe.'});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.'})
        }
    }
};