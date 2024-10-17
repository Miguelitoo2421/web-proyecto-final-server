const Especialidad = require("../models/especialidad");
const image = require("../utils/image");
//funciones

function createEspecialidad(req,res){
  const especialidad = new Especialidad(req.body);

  const imagePath = image.getFilePath(req.files.miniature);
  especialidad.miniature = imagePath;

  especialidad.save((error, especialidadStored)=>{
    if(error){
      res.status(400).send({msg: "Error al crear la especialidad"})
    }else{
      res.status(201).send(especialidadStored);
    }
  });
}

//funcion para buscar especialidades:

function getEspecialidad(req,res){

  const { page= 1, limit = 5} = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  Especialidad.paginate({}, options, (error, especialidades)=>{
    if(error){
      res.status(400).send({msg: "Error al obtener las especialidades"})
    }else{
      res.status(200).send(especialidades)
    }
  });
}

// funcion para actualizar cursos:

function updateEspecialidad(req,res){
  const {id} = req.params;
  const especialidadData = req.body;

  if(req.files.miniature){
    const imagePath = image.getFilePath(req.files.miniature);
    especialidadData.miniature = imagePath;
  }

  Especialidad.findByIdAndUpdate({_id: id}, especialidadData, (error) => {
    if(error){
      res.status(400).send({msg: "Error al actualizar la especialidad"});
    }else{
      res.status(200).send({msg: "Actualización correcta"});
    }
  });
}

//funcion para eliminar especialidad:

function deleteEspecialidad(req,res){
  const {id} = req.params;

  Especialidad.findByIdAndDelete(id, (error)=>{
    if(error){
      res.status(400).send({msg: "Error al eliminar la especialidad"})
    }else{
      res.status(200).send({msg: "Especialidad eliminada"})
    }
  });
}

module.exports = {
  createEspecialidad,
  getEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
};