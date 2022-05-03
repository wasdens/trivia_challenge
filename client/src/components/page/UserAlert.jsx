import { Alert } from '@mui/material'
import React, { useEffect } from 'react'

export default function UserAlert({setalert, data}) {

  useEffect(() => {
      setTimeout(() => {
        setalert(false)
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Alert className='alert' variant='filled' severity={data.severity}>{data.message}</Alert>
  )
}
