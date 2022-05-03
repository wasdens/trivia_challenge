import { Box, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ActionFooter from '../page/ActionFooter'
import './stylesheets/AwaitGame.css'

export default function AwaitGame({startGame, players}) {

    const [activeplayers, setactiveplayers] = useState([])

    useEffect(() => {
        getActivePlayers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [players])

    const getActivePlayers = () => {
        let tempplayers = []
        console.log(players)
        Object.entries(players).forEach(([key, val]) => {
            if (val.status === 'active') {
                tempplayers.push(val.name)
            }
        })
        console.log(tempplayers)
        setactiveplayers(tempplayers)
    }

    const genRandomDuration = () => {
        let num = (Math.random() + 1).toFixed(1)
        return num
    }

    const disabled = () => {
        return players.length < 2
    }



    return (
        <Box className='layout_box'>
            <Box className='chips'>
                {activeplayers.map((player, i) => {
                    return (
                        <Chip className='chip' color='primary' key={i} label={player} sx={{animationDuration: `${genRandomDuration()}s`}} />
                    )
                })}
            </Box>
            <ActionFooter action={startGame} actiontext={'Begin Game'} disabled={disabled()}/>
        </Box>
    )
}
