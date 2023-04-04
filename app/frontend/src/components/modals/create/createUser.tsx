/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useContext } from 'react'
import {
  Modal, Box, Typography, Button,
  Divider, TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { GlobalContext } from '../../../context/globalContext'
import api from '../../../axios/api'
import InputMask from 'react-input-mask'

interface Props {
  openAdd: boolean
  setOpenAdd: (param: boolean) => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

const CreateUserModal: React.FC<Props> = ({ openAdd, setOpenAdd }) => {
  const { setUsers } = useContext(GlobalContext)
  const [cpfInput, setInputCPF] = useState<string>('')

  const handleClose = (): void => { setOpenAdd(false) }

  const onChangeCPF = (event: InputEvent): void => {
    setInputCPF(() => event.target.value)
  }

  const onBluerCPF = (event: InputEvent): void => {
    let newCPF = event.target.value.replace(/\./g, '')
    newCPF = newCPF.replace(/_/g, '')
    newCPF = newCPF.replace(/-/g, '')

    if (newCPF.length < 11) {
      console.log('cpf deve conter 11 dígitos')
      // setApiEror(['CPF deve conter 11 dígitos!'])
    }
  }

  const { register, handleSubmit } = useForm()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #0000003e',
    boxShadow: 24,
    p: 4
  }

  const submit = handleSubmit(async (data) => {
    let newCPF = cpfInput.replace(/\./g, '')
    newCPF = newCPF.replace(/_/g, '')
    newCPF = newCPF.replace(/-/g, '')

    const newData = {
      cpf: newCPF,
      name: data.name,
      email: data.email,
      password: data.password
    }

    void api.post('/users', newData)
      .then(({ data }) => {
        alert(data.message)
        void api.get('/users')
          .then(({ data }) => {
            setUsers(data.data)
          })
      })
    handleClose()
  })

  return (
    <Modal
      open={openAdd}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component='form' onSubmit={submit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Criar Usuário
        </Typography>
        <Divider />
        <Box id="modal-modal-description" sx={{ mt: 4, mb: 2, ml: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <InputMask
              mask="999.999.999-99"
              value={cpfInput}
              onChange={onChangeCPF}
              onBlur={onBluerCPF}
            >
              <TextField label='CPF' variant='outlined' sx={{ m: 1, width: '27ch' }} />
            </InputMask>
            <TextField
              {...register('name')}
              label="Nome"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '27ch' }}
              fullWidth
            />
            <TextField
              {...register('email')}
              label="Email"
              type="email"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '27ch' }}
              fullWidth
            />
            <TextField
              {...register('password')}
              label="Senha"
              type="password"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '27ch' }}
              fullWidth
            />
          </Box>

        </Box>
        <Divider />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='end'
          sx={{ mt: 2 }}
        >
          <Button variant="outlined" color='primary' sx={{ mr: 2 }} onClick={handleClose}>Cancelar</Button>
          <Button
            variant="contained"
            color='primary'
            type='submit'
          >
            Adicionar Usuário
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateUserModal
