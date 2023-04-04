/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useContext } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../axios/api'
import { GlobalContext } from '../context/globalContext'
import InputMask from 'react-input-mask'

type InputEvent = React.ChangeEvent<HTMLInputElement>

const FormLogin = (): React.ReactElement => {
  const { saveLoginToken } = useContext(GlobalContext)
  const [cpfInput, setInputCPF] = useState<string>('')
  const [apiError, setApiEror] = useState<string[]>([])

  const onChangeCPF = (event: InputEvent): void => {
    setInputCPF(() => event.target.value)
  }

  const onBluerCPF = (event: InputEvent): void => {
    let newCPF = event.target.value.replace(/\./g, '')
    newCPF = newCPF.replace(/_/g, '')
    newCPF = newCPF.replace(/-/g, '')

    if (newCPF.length < 11) {
      setApiEror(['CPF deve conter 11 dígitos!'])
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const redirect = (url: string): void => {
    navigate(url)
  }

  const submitLogin = handleSubmit(({ password }) => {
    let newCPF = cpfInput.replace(/\./g, '')
    newCPF = newCPF.replace(/_/g, '')
    newCPF = newCPF.replace(/-/g, '')

    void api.post('/login', { cpf: newCPF, password })
      .then(({ data }) => {
        setApiEror([])
        saveLoginToken(data.user, data.token)
        redirect('/dashboard')
      }).catch((error) => {
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
          <InputMask
            mask="999.999.999-99"
            value={cpfInput}
            onChange={onChangeCPF}
            onBlur={onBluerCPF}
          >
            <TextField label='CPF' variant='standard' />
          </InputMask>
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
