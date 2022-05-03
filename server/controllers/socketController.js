const { rooms } = require('../data/data');
let playerRooms = {}

const getUid = (lengthUid) => {
    let validUid = false
    let uid
    while (validUid === false) {
        uid = []    
        for (let i = 0; i < lengthUid; i++) {
            uid.push(Math.floor(10 * Math.random()))
        }
        uid = uid.join('')
        console.log(uid)
        if (!rooms[uid]){    
            validUid = true
        }
    }
    return uid
}

const addPlayer = (data, socket, io, room) => {
    socket.join(room)
    console.log(`${data.name} joined room ${room}`)
    // modify room data and send data back to client
    let playerid = socket.id
    rooms[room].names.push(data.name)
    rooms[room].players[playerid] = {
        'status': 'active',
        'name': data.name,
        'id': playerid,
        'ingame': false
    }
    io.to(room).emit('game_join', rooms[room])
    playerRooms[socket.id] = room
}

// start new game in new room
const createGame = (data, socket, io) => {
    // create room with unique 5 digit code and add socket to room
    let room = getUid(5)
    rooms[room] = {
        'names': [],
        'roomCode': room,
        'players': {},
        'ingame': false
    }
    addPlayer(data, socket, io, room)
}

// add player to existing room
const joinGame = (data, socket, io) => {
    // locate and determine existence of room
    let room = data.room
    if (rooms[room]) {
        if (!rooms[room].names.includes(data.name)) {
            if (rooms[room].ingame) {
                socket.emit('error', {message: 'Game already started.'})
            } else {
                // add player to room
                addPlayer(data, socket, io, room)
            }
        } else {
            // player name already in use
            socket.emit('error', {message: 'Name already taken.'})
        }
    } else {
        // room does not exist
        socket.emit('error', {message: 'Room does not exist.'})
    }
}

const startGame = (data, socket, io) => {
    io.to(data.room).emit('game_start')
}

const disconnect = (socket, io) => {
    if (playerRooms[socket.id]) {
        let roomCode = playerRooms[socket.id]
        let name = rooms[roomCode].players[socket.id].name
        rooms[roomCode].players[socket.id].status = 'innactive'
        io.to(roomCode).emit('warning', {message: `${name} has left the room.`})
        io.to(roomCode).emit('game_join', rooms[roomCode])
    }
}

const inGame = (socket, io) => {
    let roomCode = playerRooms[socket.id]
    let allIn = true
    rooms[roomCode].players[socket.id].ingame = true
    Object.entries(rooms[roomCode].players).forEach(([key, value]) => {
        if (value.status === 'active' && value.ingame === false) {
            allIn = false
        }
    })
    if (allIn === true) {
        io.to(roomCode).emit('game_data', {room: rooms[roomCode]})
    }
} 


module.exports = {
    createGame,
    joinGame,
    startGame,
    disconnect,
    inGame
}