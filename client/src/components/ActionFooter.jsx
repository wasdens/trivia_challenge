import { Box, Button } from '@mui/material'
import React from 'react'
import './stylesheets/ActionFooter.css'

export default function ActionFooter({action, actiontext}) {
  return (
    <Box className='footer'>
        <Box className='full_box'>
            <Button 
                fullWidth
                size='large'
                color='secondary'
                variant='contained'
                onClick={() => action()}
            >
                {actiontext}
            </Button>
        </Box>
    </Box>
  )
}
