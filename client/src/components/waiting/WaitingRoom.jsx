import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JoinGame from './JoinGame'
import AwaitGame from './AwaitGame'
import { socket } from '../../App'
import Header from '../page/Header'
import UserAlert from '../page/UserAlert'
import { useNavigate } from 'react-router-dom'

export default function WaitingRoom() {

    const navigate = useNavigate()

    const [room, setroom] = useState('')
    const [name, setname] = useState('')
    const [roomcode, setroomcode] = useState('')
    const [players, setplayers] = useState({})
    const [alert, setalert] = useState(false)
    const [alertdata, setalertdata] = useState({
        severity: 'success',
        message: ''
    })

    useEffect(() => {
        socket.on('game_join', (data) => {
            setplayers(data.players)
            setroomcode(data.roomCode)
        })

        socket.on('game_start', () => {
            navigate('/game')
        })

        socket.on('error', (data) => {
            console.log(data.message)
            setalertdata({
                severity: 'error',
                message: data.message
            })
            setalert(true)
        })

        socket.on('warning', (data) => {
            console.log(data.message)
            setalertdata({
                severity: 'warning',
                message: data.message
            })
            setalert(true)
        })

        socket.on('disconnect', () => {
            setplayers({})
            setroomcode('')
            setroom('')
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {alert ? <UserAlert setalert={setalert} data={alertdata}/> : null}
        </Box>
    )
}
