const Newsletter = require("../models/newsletter");

//funciones

function suscribeEmail (req,res){
  const {email} = req.body;

  if(!email) res.status(400).send({msg: "Email obligatorio"});


  const newsletter = new Newsletter({
    email: email.toLowerCase(),
  })

  newsletter.save((error)=>{
    if(error){
      res.status(400).send({msg: "El email ya esta registrado"});
    }else{
      res.status(200).send({msg:"Email registrado"});
    }
  })
}

function getEmails(req, res){
  const {page =1, limit=10}=req.query

  const options = {
        page: parseInt(page),
        limit: parseInt(limit)
  };
    
  Newsletter.paginate({}, options, (error, emailsStored)=>{
    if(error){
        res.status(400).send({msg: "Error al pobtener los emails"})
    } else {
        res.status(200).send(emailsStored)
    }
  }); 
}

// ...
function deleteEmail(req, res){
  const {id} = req.params;

   Newsletter.findByIdAndDelete(id, (error) =>{
      
      if(error){
            res.status(400).send({msg: "Error al eliminar el email"})
      }else {
            res.status(200).send({msg: "Eliminación correcta"})
      }
  })
}
module.exports = {
  suscribeEmail,
  getEmails,
  deleteEmail,
};