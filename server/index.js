const express = require('express')
const cors = require('cors');
const path = require('path')
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

    socket.on('start_game', () => {

    })

    socket.on("join_game", (data) => {
        
    });
})