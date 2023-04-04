/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect } from 'react'
import {
  Modal, Box, Typography, Button,
  Divider, TextField, InputAdornment
} from '@mui/material'
import { useForm } from 'react-hook-form'
import api from '../../../axios/api'
import { GlobalContext } from '../../../context/globalContext'
import { type Vehicle } from '../../../interfaces/vehicles'

interface Props {
  openUp: boolean
  setOpenUp: (param: boolean) => void
  vehicle: Vehicle | null
}

const UpdateVehicleModal: React.FC<Props> = ({ openUp, setOpenUp, vehicle }) => {
  const { setVehicles } = useContext(GlobalContext)
  const handleClose = (): void => { setOpenUp(false) }

  const { register, handleSubmit, reset } = useForm()

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

    delete data.renavan
    delete data.chassi
    delete data.Fuelings
    delete data.abastecimentos
    delete data.id
    delete data.deletar
    delete data.editar
    delete data.detalhes

    if (vehicle !== null) {
      void api.patch(`/vehicles/${vehicle.id}`, data)
        .then(({ data }) => {
          console.log(data.message)
          void api.get('/vehicles')
            .then(({ data }) => {
              setVehicles(data.data)
            }).catch((e) => { setVehicles([]) })
        }).catch((e) => { console.log(e) })
    }

    handleClose()
  })

  useEffect(() => {
    if (vehicle !== null) {
      reset(vehicle)
    }
  }, [vehicle])

  return (
    <Modal
      open={openUp}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component='form' onSubmit={ submit }>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar Veículo
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
              disabled
            />
            <TextField
              {...register('chassi')}
              label="Chassi"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '37ch' }}
              disabled
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
            Atualizar Veículo
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default UpdateVehicleModal
