const Module = require("../models/Modules");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    async listAllModules( request, response ){
        try {
            let modulos = await Module.findAll({order: ['name']});
            return response.status(200).send(modulos);
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async createModule( request, response ){
        const { name } = request.body;

        try {
            const exists = await Module.findOne({
                where: {name: name}
            });

            if (!exists){
                Module.create({
                    name: name
                });
                return response.status(200).send({msg: 'Modulo cadastrado com sucesso.'});
            } else {
                return response.status(401).send({msg: 'O modulo já existe.'});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async updateModule( request, response){
        const { id } = request.params;
        const { name } = request.body;

        try {
            const exists = await Module.findOne({
                where: {name: name}
            });

            if (!exists){
                Module.update({
                    name: name
                }, { where: {id: id} });
                return response.status(200).send({msg: 'Modulo foi atualizado com sucesso.'});
            } else {
                return response.status(401).send({msg: `O modulo ${name} ja existe.`});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async deleteModule( request, response){
        const { id } = request.params;

        try {
            const exists = await Module.findOne({
                where: {id: id}
            });

            if (exists){
                Module.destroy({
                   where: {id: id} 
                });
                return response.status(200).send({msg: 'Modulo foi deletado com sucesso.'});
            } else {
                return response.status(401).send({msg: 'O modulo não existe.'});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    }
};