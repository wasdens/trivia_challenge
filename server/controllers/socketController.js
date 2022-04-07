const { uid } = require('uid');
const { rooms } = require('../data/data');

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
    }
    io.to(room).emit('game_join', rooms[room])
}

// start new game in new room
const createGame = (data, socket, io) => {
    // create room with unique 5 digit code and add socket to room
    let room = uid(5).toUpperCase()
    rooms[room] = {
        'names': [],
        'roomCode': room,
        'players': {},
    }
    addPlayer(data, socket, io, room)
}

// add player to existing room
const joinGame = (data, socket, io) => {
    // locate and determine existence of room
    let room = data.room
    if (rooms[room]) {
        if (!rooms[room].names.includes(data.name)) {
            // add player to room
            addPlayer(data, socket, io, room)
        } else {
            // player name already in use
            socket.emit('error', {message: 'Name already taken, please enter a new name.'})
        }
    } else {
        // room does not exist
        socket.emit('error', {message: 'Room does not exist, please check room code and try again.'})
    }
}

const startGame = (data, socket, io) => {
    io.to(data.room).emit('game_start')
}


module.exports = {
    createGame,
    joinGame,
    startGame,
}