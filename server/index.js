const express = require('express')
const cors = require('cors');
const path = require('path')
const http = require('http');
const {uid} = require('uid')
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

let rooms={}

io.on('connect', socket => {
    console.log('player connected')

    socket.on('start_game', (data) => {
      let room = uid(5).toUpperCase()
      socket.join(room)
      console.log(`player joined room ${room}`)
      rooms.room={'players': [data.name]}
      socket.emit('game_join', {room: rooms.room})
    })

    socket.on("join_game", (data) => {
        
    });
})