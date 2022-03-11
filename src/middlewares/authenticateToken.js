const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function auth(request, response, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        //console.log(token);

        jwt.verify(token, process.env.JWT_KEY,(err, data) => {
            if(err){
                res.status(401).send({msg:"Token inválido!"});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, login: data.login};
                next();
            }
        });
    }else{
        res.status(401).send({msg:"Token inválido!"});
    }
}

module.exports = auth;