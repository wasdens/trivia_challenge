import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { socket } from '../App'

export default function Game() {

    const [room, setroom] = useState('')
    const [name, setname] = useState('')

    useEffect(() => {
        socket.on('connect', () => {
            console.log('player connected')
        })

    }, [])

    const startGame = () => {
        socket.emit('start_game')
    }


    return (
        <Box className='page centered'>
            <Box className='layout_box'>
                <Box className='full_box h-stack'>
                    <Box className='half_box'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            onChange={(e) => setname(e.target.value)}
                            value={name}
                            label='Name'
                        />
                    </Box>
                    <Box className='half_box'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            onChange={(e) => setroom(e.target.value)}
                            value={room}
                            label='Room'
                        />
                    </Box>
                </Box>
                    <Box className='full_box'>
                    <Button
                        fullWidth
                        size='large'
                        disabled={name === ''}
                        variant='contained'
                        onClick={() => startGame()}
                    >
                        {room ? 'Join Game' : 'Start New Game'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
