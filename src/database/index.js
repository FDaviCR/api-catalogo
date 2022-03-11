const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const connection = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT),
        logging: false,
        timezone: '-03:00'
    }    
);

connection.authenticate().then(()=>{
    console.log("Conexão feita com o banco de dados!")
}).catch((msgErro)=>{
    console.log(msgErro);
})

module.exports = connection;