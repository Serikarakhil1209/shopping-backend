const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  images:{
    type : [String],
  }
});

const Promomodel = mongoose.model("Promo", videoSchema);

module.exports = {
    Promomodel
}
