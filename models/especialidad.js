const mongoose = require ("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const EspecialidadSchema = mongoose.Schema({
  title: String,
  miniature: String, // esto será una imagen en miniatura de la especialidad.
  description: String,
  url: String,
  price: Number,
  score: Number,
});

EspecialidadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Especialidad", EspecialidadSchema);