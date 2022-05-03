import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../App'
import UserAlert from '../page/UserAlert'

export default function Game() {

    const navigate = useNavigate()

    const [alert, setalert] = useState(false)
    const [alertdata, setalertdata] = useState({
        severity: 'success',
        message: ''
    })

    useEffect(() => {
        console.log('hello')
        socket.emit('in_game')
    }, [])

    useEffect(() => {
        socket.on('game_data', (data) => {
            console.log(data.room)
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
            navigate('/')
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box className='page centered'>
            {alert ? <UserAlert setalert={setalert} data={alertdata} /> : null}
        </Box>
    )
}
