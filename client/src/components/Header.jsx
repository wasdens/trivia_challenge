import { Box, Typography } from '@mui/material'
import React from 'react'
import './stylesheets/Header.css'

export default function Header({pagetitle}) {
  return (
    <Box className='header'>
        <Typography variant='h4'>{pagetitle}</Typography>
    </Box>
  )
}
