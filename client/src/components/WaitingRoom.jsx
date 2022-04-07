import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JoinGame from './JoinGame'
import AwaitGame from './AwaitGame'
import { socket } from '../App'
import Header from './Header'

export default function WaitingRoom() {

    const [room, setroom] = useState('')
    const [name, setname] = useState('')
    const [roomcode, setroomcode] = useState('')
    const [players, setplayers] = useState()

    useEffect(() => {
        socket.on('game_join', (data) => {
            setplayers(data.players)
            setroomcode(data.roomCode)
        })

        socket.on('game_start', () => {
            console.log('This is working')
        })

        socket.on('error', (data) => {
            console.log(data.message)
        })

    }, [])

    const joinGame = () => {
        if (!room) {
            socket.emit('create_game', {name: name})
        } else {
            socket.emit('join_game', {name: name, room: room})
        }
    }

    const startGame = () => {
        socket.emit('start_game', {room: roomcode})
    }


    return (
        <Box className='page centered'>
            <Header pagetitle={roomcode}/>
            {!roomcode ? <JoinGame room={room} setroom={setroom} name={name} setname={setname} joinGame={joinGame}/> 
            : <AwaitGame players={players} startGame={startGame}/>}
        </Box>
    )
}
