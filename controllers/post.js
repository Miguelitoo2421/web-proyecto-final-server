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
// ...


module.exports = {
  createPost,
};