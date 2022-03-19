const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
    async checkToken( request, response ){
        const { token } = request.body;
        try {
            jwt.verify(token, process.env.JWT_KEY,(err, data) => {
                if(err){
                    response.status(400).send(false);
                }else{
                    response.status(200).send(true);
                }
            });
        } catch (error) {
            return response.status(400).send(false);
        }
    }
};
