import { Box, Chip } from '@mui/material'
import React from 'react'
import ActionFooter from './ActionFooter'
import './stylesheets/AwaitGame.css'

export default function AwaitGame({data, startGame}) {
    return (
        <Box className='layout_box'>
            <Box className='chip_box chips'>
                {data.players.map((player, i) => {
                    return (
                        <Chip className='chip' color='primary' key={i} label={player} />
                    )
                })}
            </Box>
            <ActionFooter action={startGame} actiontext={'Begin Game'}/>
        </Box>
    )
}
