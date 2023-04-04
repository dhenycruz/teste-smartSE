import React from 'react'
import { Box } from '@mui/material'
import bg from '../images/bg.jpg'
import FormLogin from '../components/formlogin'

const Login = (): React.ReactElement => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      width='100vw'
      height='100vh'
      sx={{
        background: `rgba(0, 0, 0, 0.9) url(${bg})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'darken'
      }}
    >
      <FormLogin />
    </Box>
  )
}

export default Login
