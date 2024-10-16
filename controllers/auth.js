const bcrypt = require("bcryptjs");
const User = require ("../models/usuario");
const jwt = require("../utils/jwt");

function register(req,res){
  const {firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({msg: "El email es obligatorio"});
  if (!password) res.status(400).send({msg: "La contraseña es obligatoria"});

  const usuario = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password,salt)
  usuario.password = hashPassword;

  
  usuario.save((error, usuarioStorage)=>{
    if(error){
      res.status(400).send({msg:"Error al crear el usuario"});
    }else{
      res.status(200).send(usuarioStorage);
    }
  });
}

function login(req,res){
  const {email, password} = req.body

  if(!email) res.status(400).send({msg: "El email es obligatorio"});
  if(!password) res.status(400).send({msg: "La contraseña es obligatoria"});

  const emailLowerCase = email.toLowerCase();
  
  //buscaremos un solo usuario:
  User.findOne({email: emailLowerCase}, (error, usuarioStorage) => {
    if(error){
      res.status(500).send({msg: "Error del servidor"})
    }else{ //--> aqui hemos encontrado el usuario, pero tenemos que comprobar la contraseña.
      bcrypt.compare(password, usuarioStorage.password, (bcryptError, check) => {
        if(bcryptError){
          res.status(500).send({msg: "Error del servidor"});
        }else if(!check){
          res.status(400).send({msg: "Contraseña incorrecta"});
        }else if(!usuarioStorage.active){
          res.status(401).send({msg: "Usuario no autorizado o no activo"})
        }else{
          res.status(200).send({
            access: jwt.createAccessToken(usuarioStorage),
            refresh: jwt.createRefreshToken(usuarioStorage),
          })
        }
      });
    }
  });
}


/* con esta funcion obtendremos un nuevo token de ese usuario sin mandarle
   las credenciales y podemos refrescar la sesión el tiempo que digamos, hasta
   que el refresh token se agote, cuando este caduque la sesion se cerrará por
   completo
*/
function refreshAccessToken(req,res){
  const {token} = req.body;

  if(!token) res.status(400).send({msg: "Token requerido"});
  
  const {user_id} = jwt.decoded(token);

  // tenemos que buscar si el usuario existe en la base de datos:
  User.findOne({_id: user_id},(error, usuarioStorage) => {
    if(error){
      res.status(500).send({msg: "Error del servidor"});
    }else{
      res.status(200).send({
        accessToken: jwt.createAccessToken(usuarioStorage)
      });
    }
  })
}


module.exports = {
  register,
  login,
  refreshAccessToken,
};