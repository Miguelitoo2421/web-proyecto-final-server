/* este middleware(function) va a indicar si el usuario que esta haciendo la peticion 
   puede o no continuar con ella, estos serían end-point protegidos.
*/ 

const jwt = require("../utils/jwt");

function asureAuth(req,res,next){ // con next indicamos que puede continuar con la siguiente función.
  
  if(!req.headers.authorization){
    return res
      .status(403)
      .send({msg: "La petición no tiene la cabecera de autenticación"});
  }

  const token = req.headers.authorization;
  try {

    const payload = jwt.decoded(token);
    
    const {exp} = payload // sacamos fecha actual.
    const currentData = new Date().getTime();

    if(exp <= currentData){ //--> esto significa que ha caducado.
      return res.status(400).send({msg: "El token ha expirado"});
    }

    req.user = payload;
    next();
    
  } catch (error) {
    return res.status(400).send({msg: "Token invalido"})
    
  }
}

module.exports = {
  asureAuth,
}