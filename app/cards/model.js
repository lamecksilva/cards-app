const mongoose = require("mongoose");
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const CardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "users"
  }
}, {
  collection: "cards"
})

module.exports = mongoose.model("card", CardSchema)