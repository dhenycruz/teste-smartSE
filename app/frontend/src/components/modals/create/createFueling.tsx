/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react'
import {
  Modal, Box, Typography, Button,
  Divider, TextField, MenuItem, InputAdornment
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { type Vehicle } from '../../../interfaces/vehicles'
// import api from '../../../axios/api'
import { GlobalContext } from '../../../context/globalContext'
import api from '../../../axios/api'

interface Props {
  openAdd: boolean
  setOpenAdd: (param: boolean) => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

const CreateFuelingModal: React.FC<Props> = ({ openAdd, setOpenAdd }) => {
  const { vehicles, setFuelings } = useContext(GlobalContext)
  const [value, setValue] = useState('')
  const handleClose = (): void => { setOpenAdd(false) }

  const handleValue = (event: InputEvent): void => {
    const val = event.target.value
    setValue(val)
  }
  const { register, handleSubmit } = useForm()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #0000003e',
    boxShadow: 24,
    p: 4
  }

  const submit = handleSubmit(async (data) => {
    const newDate = {
      type_fuel: data.type_fuel,
      value: parseFloat(value),
      quantity_fueled: data.quantity_fueled,
      carId: data.carId
    }

    console.log(newDate)

    void api.post('/fuelings', newDate)
      .then(({ data }) => {
        console.log(data)
        void api.get('/fuelings')
          .then(({ data }) => {
            setFuelings(data.data)
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
      <Box sx={style} component='form' onSubmit={ submit }>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Abastecer Veículo
        </Typography>
        <Divider />
        <Box id="modal-modal-description" sx={{ mt: 4, mb: 2, ml: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            id="outlined-select-currency"
            select
            label="Selecionar Carro"
            sx={{ m: 1, width: '27ch' }}
            {...register('carId')}
          >
            {vehicles.map((vehicle: Vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.marca} {vehicle.modelo}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Tipo de Combustível"
            sx={{ m: 1, width: '27ch' }}
            {...register('type_fuel')}
          >
            <MenuItem value='diesel'>
              Diesel
            </MenuItem>
            <MenuItem value='gasolina'>
              Gasolina
            </MenuItem>
            <MenuItem value='alcool'>
              Álcool
            </MenuItem>
          </TextField>
          <div>
            <TextField
              value={value}
              onChange={handleValue}
              label="Valor"
              type='number'
              variant='outlined'
              id="outlined-start-adornment"
              sx={{ m: 1, width: '27ch' }}
              inputProps={{
                step: 0.01
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>
              }}
            />
          </div>
          <div>
            <TextField
              {...register('quantity_fueled')}
              label="Quantidade abastecida"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '27ch' }}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="start">Litros</InputAdornment>
              }}
            />
          </div>
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
            Abastecer
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateFuelingModal
