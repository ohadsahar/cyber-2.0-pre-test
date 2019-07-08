const mongoose = require("mongoose");

const CubeData = mongoose.Schema({

  width: {type: String},
  height: { type: String},
  direction: { type: String}
})

module.exports = mongoose.model("SaveCubeData", CubeData);


