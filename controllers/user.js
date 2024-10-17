const bcrypt = require("bcryptjs");
const User = require("../models/usuario");
const image = require ("../utils/image");


// esta función nos devuelve los datos del usuario que si está logeado.
async function getMe(req,res){
  const {user_id} = req.user;

  const response = await User.findById(user_id);

  if(!response){
    res.status(400).send({msg: "No se ha encontrado usuario"});
  }else{
    res.status(200).send(response);
  }
}

// esta función nos devolverá todos los usuarios(activos-inactivos), todos los usuarios (activos), todos los usuarios(inactivos).
async function getUsers(req,res){

  const{active} = req.query;
  let response = null

  if(active === undefined){
    response = await User.find();
  }else{
    response = await User.find({active});
  }

  res.status(200).send(response);
}

// funcion para crear usuarios desde el panel de administrador.

async function createUser(req,res){
  const {password} = req.body;
  const user = new User({...req.body, active: false});
  
  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password,salt);
  user.password = hasPassword;

  
  // condicionaremos para que el avatar(imagen) no sea obligatorio

  if(req.files.avatar){
    const imagePath = image.getFilePath(req.files.avatar)
    user.avatar = imagePath;
  
  }
  
  user.save((error, userStored) => {
    if(error){
      res.status(400).send({msg: "Error al crear el usuario"})
    }else{
      res.status(201).send(userStored);
    }
  });
}

//aqui editaremos al usuario:
async function updateUser(req,res){
  const {id} = req.params;
  const userData = req.body;

  //password: aqui configuramos para que al hacer update de contraseña nos la de encriptada tambien.
  if(userData.password){
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password,salt);
    userData.password = hashPassword;
  }else{
    delete userData.password;
  }
  //avatar
  if(req.files.avatar){
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }


  User.findByIdAndUpdate({_id: id}, userData, (error) =>{
    if(error){
      res.status(400).send({msg: "Error al actualizar el usuario"})
    }else{
      res.status(200).send({msg: "Actualización correcta"});
    }
  });
}

//crearemos la funcion para eliminar usuarios:

async function deleteUser(req,res){
  const {id} = req.params;

  User.findByIdAndDelete(id, (error)=>{
    if(error){
      res.status(400).send({msg: "Error al eliminar el usuario"})
    }else{
      res.status(200).send({msg: "Usuario eliminado"})
    }
  });
}


module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}