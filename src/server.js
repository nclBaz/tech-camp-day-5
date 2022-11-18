import express from "express" // PACCHETTO DI TERZE PARTI
import mongoose from "mongoose" // PACCHETTO DI TERZE PARTI
import SongModel from "./model.js" // PACCHETTO CHE HO SCRITTO IO

const server = express()
const port = 3001

server.use(express.json())

server.get("/songs", async function (request, response) {
  // Quando arriva una richiesta GET /songs, vado nel database leggo la lista delle canzoni
  const songsArray = await SongModel.find()

  // La mando in risposta al richiedente
  response.send(songsArray)
}) // GET --> /songs

server.post("/songs", async function (request, response) {
  // Quando arriva una richiesta POST /songs, vado nel database inserisco una nuova canzone
  const newSong = new SongModel(request.body)

  await newSong.save()

  // Mando una risposta

  response.send({ message: "Canzone salvata correttamente!" })
})

server.get("/songs/:songId", async function (request, response) {
  const song = await SongModel.findById(request.params.songId)

  response.send(song)
}) // GET --> /songs/1928398273921

server.put("/songs/:songId", async function (request, response) {
  await SongModel.findByIdAndUpdate(request.params.songId, request.body)
  response.send({ message: "Modificata!" })
})

server.delete("/songs/:songId", async function (request, response) {
  await SongModel.findByIdAndDelete(request.params.songId)
  response.send({ message: "Cancellata!" })
})

mongoose.connect("mongodb://localhost:27017/tech-camp") // CONNESSIONE A MONGODB

server.listen(port, () => {
  // ESEGUO IL SERVER
  console.log("Tutto ok! Il server funziona correttamente!")
})
