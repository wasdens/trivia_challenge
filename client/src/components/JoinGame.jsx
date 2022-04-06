import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function JoinGame({name, setname, room, setroom, joinGame}) {
    return (
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
                    color={room ? 'primary' : 'secondary'}
                    onClick={() => joinGame()}
                >
                    {room ? 'Join Game' : 'Start New Game'}
                </Button>
            </Box>
        </Box>
    )
}
