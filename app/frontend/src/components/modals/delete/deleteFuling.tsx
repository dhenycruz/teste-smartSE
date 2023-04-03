import React, { useContext } from 'react'
import { Modal, Box, Typography, Button, Divider } from '@mui/material'
import api from '../../../axios/api'
import { GlobalContext } from '../../../context/globalContext'
import { type Fueling } from '../../../interfaces/fueling'

interface Props {
  fueling: Fueling | null
  open: boolean
  setOpen: (param: boolean) => void
}

const DeleteFuelingModal: React.FC<Props> = ({ fueling, open, setOpen }) => {
  const { setFuelings } = useContext(GlobalContext)
  const handleClose = (): void => { setOpen(false) }

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

  const submit = (id: number): void => {
    void api.delete(`/fuelings/${id}`)
      .then(({ data }) => {
        console.log(data.message)
        void api.get('/fuelings')
          .then(({ data }) => {
            setFuelings(data.data)
          }).catch((e) => { setFuelings([]) })
        handleClose()
      }).catch((e) => {
        console.log(e)
      })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Deletar Veículos
        </Typography>
        <Divider />
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Deseja realmente deletar o dados desse abastecimento?
        </Typography>
        <Divider />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='end'
          sx={{ mt: 2 }}
        >
          <Button variant="outlined" color='error' sx={{ mr: 2 }} onClick={handleClose}>Não</Button>
          <Button
            variant="contained"
            color='error'
            onClick={() => { fueling !== null && submit(fueling.id) }}
          >
            Sim
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteFuelingModal
