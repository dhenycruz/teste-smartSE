import React, { useEffect, useState } from 'react'
import { Modal, Box, Button, Divider, Avatar, Typography } from '@mui/material'
import { type Vehicle } from '../../../interfaces/vehicles'
import { type Fueling } from '../../../interfaces/fueling'
import api from '../../../axios/api'

interface Props {
  vehicle: Vehicle | null
  openDetails: boolean
  setOpenDetails: (param: boolean) => void
}

/* interface IVehicle extends Vehicle {
  fuelings?: Fueling[]
} */

const DetailsVehicleModal: React.FC<Props> = ({ vehicle, openDetails, setOpenDetails }) => {
  const handleClose = (): void => { setOpenDetails(false) }
  const [fuelings, setFuelings] = useState<Fueling[]>([])

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #0000003e',
    boxShadow: 24,
    p: 4
  }

  const formatedDate = (date: Date): string => {
    const novaData = new Date(date)
    return novaData.toLocaleString('pt-BR')
  }

  const formatedCurrency = (currency: string): string => {
    return Number(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  useEffect(() => {
    if (vehicle !== null) {
      void api.get(`/vehicles/${vehicle.id}`)
        .then(({ data }) => {
          setFuelings(data.Fuelings)
        }).catch((e) => { console.log(e) })
    }
  }, [vehicle])

  return (
    <Modal
      open={openDetails}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box id="modal-modal-title" >
          <Box display={'flex'} alignItems={'center'} mb={2}>
            <Avatar alt="Remy Sharp" src={vehicle?.image} sx={{ marginRight: 2 }} />
            <Typography>
              {vehicle?.marca} {vehicle?.modelo} - {vehicle?.anoFabricacao}/{vehicle?.anoModelo}
            </Typography>
          </Box>
          <Box>
            <Typography mb={1}>
              <b style={{ color: '#999999' }}>Cor:</b> {vehicle?.cor} |
              <b style={{ color: '#999999' }}>Motor:</b> {vehicle?.motor} |
              <b style={{ color: '#999999' }}>Potência:</b> {vehicle?.potencia}
            </Typography>
            <Divider />
            <Typography mb={1} mt={1}>
              <b style={{ color: '#999999' }}>Placa:</b> {vehicle?.placa} |
              <b style={{ color: '#999999' }}>Cidade/UF:</b> {vehicle?.localizacao}
            </Typography>
            <Divider />
            <Typography mb={1} mt={1}>
              <b style={{ color: '#999999' }}>Renavan:</b> {vehicle?.renavan} |
              <b style={{ color: '#999999' }}>Chassi:</b> {vehicle?.chassi}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          <Typography>Abastecimentos({fuelings.length}):</Typography>
          {
            fuelings.length < 1
              ? <Typography align="center" mt={4} mb={4}>O carro ainda não foi abastecido</Typography>
              : fuelings.map((fueling, index) => (
              <div key={index}>
                <Typography mb={2} mt={2}>
                  <b style={{ color: '#999999' }}>ID:</b> {`${fueling.id} | `}
                  <b style={{ color: '#999999' }}>Tipo:</b> {`${fueling.type_fuel} | `}
                  <b style={{ color: '#999999' }}>Qtd:</b> {`${fueling.quantity_fueled} Litros | `}
                  <b style={{ color: '#999999' }}>Valor:</b> {formatedCurrency(fueling.value) + ' | '}
                  <b style={{ color: '#999999' }}>Data:</b> {formatedDate(fueling.dateFueled)}
                </Typography>
                <Divider />
              </div>
              ))
          }
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='end'
          sx={{ mt: 2 }}
        >
          <Button variant="outlined" color='error' sx={{ mr: 2 }} onClick={handleClose}>Fechar</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DetailsVehicleModal
