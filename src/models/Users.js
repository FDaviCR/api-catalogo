const Sequelize = require("sequelize");
const connection = require("../database");

const Usuario = connection.define('users',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorization: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

Usuario.sync({force:false});

module.exports = Usuario;