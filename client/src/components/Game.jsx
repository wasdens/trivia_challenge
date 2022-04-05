import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io(process.env.REACT_APP_SOCKET_URL)

export default function Game() {

    useEffect(() => {
        socket.on('connection', () => {
            console.log('player connected on the front end')
        })

    }, [])


  return (
    <div>Game</div>
  )
}
