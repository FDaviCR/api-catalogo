const express = require('express');
const app = express();
//const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const main = require('./routes/index');

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(main);

app.listen(process.env.PORT, () => {
    console.log("O servidor está rodando!")
});