const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PostSchema = mongoose.Schema({
  title: String,
  miniature: String,
  content: String,
  path:{  // no podrá haber dos post con la misma url.
    type: String,
    unique:true,
  },
  created_at: Date, //fecha de creación del post
});

PostSchema.plugin(mongoosePaginate); // con esto tenemos acceso a la paginación en este modelo.

module.exports = mongoose.model("Post", PostSchema);