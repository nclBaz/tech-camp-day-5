import mongoose, { model } from "mongoose"

const songSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  artist: {
    name: String,
    surname: String,
  },
  album: {
    title: String,
    cover: String,
  },
})

export default model("Song", songSchema)
