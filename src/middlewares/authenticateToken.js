const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function auth(request, response, next){
    const authToken = request.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        
        jwt.verify(token, process.env.JWT_KEY,(err, data) => {
            if(err){
                response.status(401).send({msg:"Token inválido!"});
            }else{
                request.token = token;
                request.loggedUser = {id: data.id, login: data.login};
                next();
            }
        });
    }else{
        response.status(401).send({msg:"Token inválido!"});
    }
}

module.exports = auth;