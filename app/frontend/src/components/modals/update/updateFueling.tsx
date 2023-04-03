/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from 'react'
import {
  Modal, Box, Typography, Button,
  Divider, TextField, MenuItem, InputAdornment
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { type Vehicle } from '../../../interfaces/vehicles'
import { GlobalContext } from '../../../context/globalContext'
import api from '../../../axios/api'
import { type Fueling } from '../../../interfaces/fueling'

interface Props {
  openUp: boolean
  setOpenUp: (param: boolean) => void
  fueling: Fueling | null
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

const UpdateFuelingModal: React.FC<Props> = ({ openUp, setOpenUp, fueling }) => {
  const { vehicles, setFuelings } = useContext(GlobalContext)
  const [value, setValue] = useState<string | undefined>(fueling?.value)
  const handleClose = (): void => { setOpenUp(false) }

  const handleValue = (event: InputEvent): void => {
    const val = event.target.value
    setValue(val)
  }
  const { register, reset, handleSubmit } = useForm()

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
    if (value !== undefined) {
      const newDate = {
        type_fuel: data.type_fuel,
        value: parseFloat(value),
        quantity_fueled: data.quantity_fueled,
        carId: data.carId
      }

      void api.post('/fuelings', newDate)
        .then(({ data }) => {
          console.log(data)
          void api.get('/fuelings')
            .then(({ data }) => {
              setFuelings(data.data)
            })
        })
    }
  })

  useEffect(() => {
    if (fueling !== null) {
      reset(fueling)
    }
  })

  return (
    <Modal
      open={openUp}
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
            defaultValue={fueling?.carId}
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
            defaultValue={fueling?.type_fuel}
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
              defaultValue={fueling?.value}
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

export default UpdateFuelingModal
