const Module = require("../models/Modules");
const Class = require("../models/Classes");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    async listAllClasses( request, response ){
        try {
            let aulas = await Class.findAll(
                {order:['name']}
            );
            return response.status(200).send(aulas);
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async listClassesForModule( request, response ){
        const { idModule } = request.params;
        try {
            let aulas = await Class.findAll({
                where:{idModule: idModule},
                order: ['name']
            });
            return response.status(200).send(aulas);
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async createClass( request, response ){
        const { name, description, date, time, idModule } = request.body;

        try {
            const moduleExists = await Module.findOne({
                where: {id: idModule}
            });

            if(!moduleExists) {
                return response.status(404).send({msg: 'O módulo informado não existe'});
            };

            const exists = await Class.findOne({
                where: {
                    name: name, idModule: idModule
                }
            });

            if (!exists){
                Class.create({
                    name: name, description: description, date: date, time: time, idModule: idModule
                });
                return response.status(200).send({msg: 'Aula cadastrada com sucesso.'});
            } else {
                return response.status(401).send({msg: 'A aula já existe.'});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async updateClass( request, response){
        const { id } = request.params;
        const { name, description, date, time, idModule } = request.body;

        try {
            const exists = await Class.findOne({
                where: {name: name, idModule: idModule}
            });

            if (!exists){
                Class.update({
                    name: name, description: description, date: date, time: time, idModule: idModule
                }, { where: {id: id} });
                return response.status(200).send({msg: 'Aula atualizada com sucesso.'});
            } else {
                return response.status(401).send({msg: `A aula ${name} ja existe no módulo.`});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async deleteClass( request, response){
        const { id } = request.params;

        try {
            const exists = await Class.findOne({
                where: {id: id}
            });

            if (exists){
                Class.destroy({
                   where: {id: id} 
                });
                return response.status(200).send({msg: 'Aula deletada com sucesso.'});
            } else {
                return response.status(401).send({msg: 'A aula não existe.'});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    }
};