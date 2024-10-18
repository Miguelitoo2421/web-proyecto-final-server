const Post = require("../models/post");
const image = require("../utils/image");

//funciones

function createPost(req,res){
  const post = new Post(req.body);
  post.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  post.miniature = imagePath;

  post.save((error, postStored)=> {
    if(error){
      res.status(400).send({msg:"Error al crear el post"});
    }else{
      res.status(201).send(postStored);
    }
  });
}


// funcion de recibir el post:

function getPosts(req,res){
  const {page = 1, limit = 10} = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: {created_ad: "desc"},
  }
  Post.paginate({}, options, (error, postsStored)=>{
    if(error){
      res.status(400).send({msg: "Error al obtener los post"})
    }else{
      res.status(200).send(postsStored);
    }
  });
}

// funcion para actializar post:
function updatePost(req, res){
  const {id} = req.params;
  const postData = req.body;

  if(req.files.miniature){
    const imagePath = image.getFilePath(req.files.miniature);
    postData.miniature = imagePath;

  }

  Post.findByIdAndUpdate({_id: id}, postData, (error)=>{
    if(error){
      res.status(400).send({msg: "Error al actualizar el post"});
    }else{
      res.status(200).send({msg: "Actualización correcta"});
    }
  });
}

//funcion delete

function deletePost (req,res){
  const {id} = req.params

  Post.findByIdAndDelete(id, (error)=>{
    if(error){
      res.status(400).send({msg: "Error al eliminar el posta"});
    } else {
      res.status(200).send({msg: "Post eliminado"});
    }
  });
}

function getPost(req,res){
  const {path} = req.params;

  Post.findOne({path}, (error, postStore)=>{
    if(error){
      res.status(500).send({msg:"Error del servidor"});
    }else if(!postStore){
      res.status(400).send({msg:"No se han encontrado post"})
    } else {
      res.status(200).send(postStore);
    }
  });
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};