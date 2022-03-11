const Sequelize = require("sequelize");
const connection = require("../database");

const Modulo = connection.define('modules',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

Modulo.sync({force:false});

module.exports = Modulo;