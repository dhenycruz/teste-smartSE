/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import api from '../axios/api'

const FormLogin = (): React.ReactElement => {
  const [apiError, setApiEror] = useState<string[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitLogin = handleSubmit((data) => {
    console.log(data)
    void api.post('/login', data)
      .then(({ data }) => {
        setApiEror([])
        console.log(data)
      }).catch((error) => {
        console.log(error.response.data.message)
        setApiEror([error.response.data.message])
      })
  })

  return (
    <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        flexDirection='column'
        component='form'
        sx={{
          width: 300,
          height: 300,
          borderRadius: 5,
          backgroundColor: 'white',
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        onSubmit={ submitLogin }
        autoComplete='off'
      >
        <div>
          <TextField
            {...register('cpf', {
              required: true,
              minLength: 11
            })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            aria-invalid={ (errors.cpf != null) ? 'true' : 'false' }
            id='cpf'
            label='CPF'
            type='number'
            variant='standard'
            sx={{ marginBottom: 4 }}
          />
          <TextField
            {...register('password', { required: true })}
            id='password'
            label='Senha'
            type='password'
            variant='standard'
          />
        </div>
          { apiError.length > 0 && <Typography textAlign='center' color='red'>{apiError }</Typography> }
          { errors.cpf?.type === 'required' && <Typography textAlign='center' color='red'>O campo CPF é obrigatório!</Typography> }
          { errors.cpf?.type === 'minLength' && <Typography textAlign='center' color='red'>O CPF tem que ter 11 dígitos!</Typography> }
        <Button
          size='large'
          variant='contained'
          type='submit'
        >
          ENTRAR
        </Button>
    </Box>
  )
}

export default FormLogin