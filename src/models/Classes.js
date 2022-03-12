const Sequelize = require("sequelize");
const connection = require("../database");

const Modulo = require("../models/Modules");

const Aula = connection.define('classes',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idModule: {
        allowNull: false,
        references: {
            model: 'modules', 
            key: 'id'
        },
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    date:{
        allowNull: false,
        type: Sequelize.STRING,
    },
    time: {
        allowNull: false,
        type: Sequelize.STRING,
    }
},{
    timestamps: false
});

Aula.belongsTo(Modulo, {foreignKey: 'idModule'})

Aula.sync({force:false});

module.exports = Aula;