/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext } from 'react'
import {
  Modal, Box, Typography, Button,
  Divider, TextField, InputAdornment
} from '@mui/material'
import { useForm } from 'react-hook-form'
import api from '../../../axios/api'
import { GlobalContext } from '../../../context/globalContext'

interface Props {
  openAdd: boolean
  setOpenAdd: (param: boolean) => void
}

const CreateVehicleModal: React.FC<Props> = ({ openAdd, setOpenAdd }) => {
  const { setVehicles } = useContext(GlobalContext)
  const handleClose = (): void => { setOpenAdd(false) }

  const { register, handleSubmit } = useForm()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #0000003e',
    boxShadow: 24,
    p: 4
  }

  const submit = handleSubmit(async (data) => {
    data.userId = 1
    data.anoModelo = Number(data.anoModelo)
    data.anoFabricacao = Number(data.anoFabricacao)

    console.log(data)
    void api.post('/vehicles', data)
      .then(({ data }) => {
        console.log(data.message)
        void api.get('/vehicles')
          .then(({ data }) => {
            setVehicles(data.data)
          }).catch((e) => { setVehicles([]) })
      }).catch((e) => { console.log(e) })
    handleClose()
  })

  return (
    <Modal
      open={openAdd}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component='form' onSubmit={ submit }>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicionar um novo Veículo
        </Typography>
        <Divider />
        <Box id="modal-modal-description" sx={{ mt: 4, mb: 2, ml: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <TextField
              {...register('modelo')}
              label="Modelo"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
            <TextField
              {...register('marca')}
              label="Marca"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
          </div>
          <div>
          <TextField
            {...register('cor')}
            label="Cor"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
          />
          <TextField
            {...register('motor')}
            label="Motor"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '24ch' }}
          />
          <TextField
            {...register('potencia')}
            label="Potência"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '24ch' }}
            InputProps={{
              endAdornment: <InputAdornment position="start">cv</InputAdornment>
            }}
          />
          </div>
          <div>
            <TextField
              {...register('placa')}
              label="Placa"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
            <TextField
              {...register('localizacao')}
              label="Cidade/Estado"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
          </div>
          <div>
            <TextField
              {...register('anoFabricacao')}
              label="Ano de fabricação"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
            <TextField
              {...register('anoModelo')}
              label="Ano do Modelo"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
          </div>
          <div>
            <TextField
              {...register('renavan')}
              label="Renavan"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
            <TextField
              {...register('chassi')}
              label="Chassi"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
            />
          </div>
          <TextField
            {...register('image')}
            label="Image(url)"
            id="outlined-start-adornment"
            fullWidth
            sx={{ m: 1 }}
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
            Adiconar Veículo
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateVehicleModal
