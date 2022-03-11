const bcrypt = require('bcrypt');
const User = require("../models/Users");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
    async createUser( request, response ){
        const { user, password } = request.body;

        let salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const exists = await User.findOne({
                where: {user: user}
            });

            if (!exists){
                User.create({
                    user: user,
                    password: hash,
                    authorization: 'admin'
                });
                return response.status(200).send({msg: 'Usuário cadastrado com sucesso.'});
            } else {
                return response.status(401).send({msg: 'O usuário já existe.'});
            }
        } catch (error) {
            return response.status(400).send({msg: 'Aconteceu um erro, tente novamente.', error});
        }
    },

    async authenticateUser( request, response ){
        const { user, password } = request.body;

        try{
            const exists = await User.findOne({where: {user:user}})
      
            if(!exists){
                return response.status(401).send({msg: 'Usuário não existe'})
            }
      
            if(!(await bcrypt.compare(password, exists.password))){
                return response.status(401).send({msg: 'Senha invalida'})
            }
      
            if(exists.authorization === 'admin'){
                const token = jwt.sign({id: exists.id}, process.env.JWT_KEY, {expiresIn: '5m'})
                return response.status(200).send({token, user: exists})
            }
        }
        catch(error){
            return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde', error})
        }
    }
};