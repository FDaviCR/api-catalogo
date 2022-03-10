const Sequelize = require("sequelize");
const connection = require("../database");

const Usuario = connection.define('usuarios',{
    login:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Usuario.sync({force:false});

module.exports = Usuario;