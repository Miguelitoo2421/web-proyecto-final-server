const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../constants");

function createAccessToken(usuario){
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);

  // aqui CREAMOS el payload OJO.
  const payload = {
    token_type: "access",
    user_id: usuario._id,
    iat: Date.now(),  //fecha de creación del token
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);  //--> esto nos generará el token

}


// aqui CREAMOS el refresh token.
function createRefreshToken(usuario){
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() +1);

  
  const payload = {
    token_type: "refresh",
    user_id: usuario._id,
    iat: Date.now(),  
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY); 
}

// funcion para decodificar nuestro token OJO.

function decoded(token){
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};
