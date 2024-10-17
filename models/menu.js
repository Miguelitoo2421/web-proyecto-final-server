const mongoose = require("mongoose");

//LA IDEA DE ESTE MENÚ ES QUE EL ADMIN DE WEB O EN MI CASO EL DUEÑO DE LA CLINICA
//PUEDA CAMBIAR EL MENU SIN TENER QUE TOCAR CODIGO.



const MenuSchema = mongoose.Schema({
  title: String,
  path: String,  // URL a la que irá el usuario al hacer click.
  order: Number,  // para moverlo de posicion.
  active: Boolean, // controlar si lo queremos visual o nó, para no tener que borrarlo.
});

module.exports = mongoose.model("Menu", MenuSchema);