const express = require('express')
const cors = require('cors');
const path = require('path')
const { createGame, joinGame, startGame, disconnect, inGame } = require('./controllers/socketController')
const http = require('http');
const PORT = process.env.PORT || 4000
const app = express()
const server = http.createServer(app)
const io = require('socket.io') (server, {
    cors: {
      origin: "*",
      methods: "*"
    }
  });

app.use(cors({
    origin: '*'
}));

server.listen(PORT, () => console.log(`listening on port ${PORT}.`))

io.on('connect', socket => {
    console.log('player connected')

    socket.on('create_game', (data) => {
      createGame(data, socket, io)
    })

    socket.on("join_game", (data) => {
      joinGame(data, socket, io)
    });

    socket.on("start_game", (data) => {
      startGame(data, socket, io)
    })

    socket.on("disconnect", () => {
      disconnect(socket, io)
    })

    socket.on("in_game", () => {
      inGame(socket, io)
    })
})