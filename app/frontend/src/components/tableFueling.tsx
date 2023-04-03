/* eslint-disable no-octal */
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Button, Box } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import api from '../axios/api'
import { type Fueling } from '../interfaces/fueling'
import { GlobalContext } from '../context/globalContext'
import DeleteFuelingModal from './modals/delete/deleteFuling'
import CreateFuelingModal from './modals/create/createFueling'
import UpdateFuelingModal from './modals/update/updateFueling'

interface IFueling extends Fueling {
  quantity?: string
  valueFormated?: string
  date?: string
  deletar?: number
  editar?: number
  detalhes?: number
}

export default function TableFueling (): React.ReactElement {
  const { fuelings, setFuelings } = useContext(GlobalContext)
  const [open, setOpen] = useState<boolean>(false)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [openUp, setOpenUp] = useState<boolean>(false)
  const [selectFueling, setSelectFueling] = useState<Fueling | null>(null)

  const handleOpen = (fueling: Fueling): void => {
    setSelectFueling(fueling)
    setOpen(true)
  }

  const handleOpenUp = (fueling: Fueling): void => {
    setSelectFueling(fueling)
    setOpenUp(true)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'carId',
      headerName: 'Veículo',
      width: 150
    },
    {
      field: 'type_fuel',
      headerName: 'Tipo',
      width: 100,
      renderCell: (params) => params.value.toUpperCase()
    },
    {
      field: 'quantity',
      headerName: 'Quantidade(Litros)',
      width: 150
    },
    {
      field: 'valueFormated',
      headerName: 'Valor',
      width: 100
    },
    {
      field: 'date',
      headerName: 'Data',
      width: 200
    },
    {
      field: 'deletar',
      headerName: 'Deletar',
      description: 'Deletar usuário',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => { handleOpen(params.row) }}
        >
          <DeleteForeverIcon />
        </Button>
      )
    },
    {
      field: 'editar',
      description: 'Editar usuário',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => { handleOpenUp(params.row) }}
        >
          <EditIcon />
        </Button>
      )
    }
  ]

  const rows = fuelings.map((fueling: IFueling) => {
    fueling.valueFormated = Number(fueling.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const novaData = new Date(fueling.dateFueled)
    fueling.date = novaData.toLocaleString('pt-BR')
    fueling.quantity = `${fueling.quantity_fueled} Litros`
    return fueling
  })

  useEffect(() => {
    void api.get('/fuelings')
      .then(({ data }) => {
        setFuelings(data.data)
      })
  })
  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h1>Abastecimentos({fuelings.length})</h1>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { setOpenAdd(true) }}
          >
            Abaster um carro
          </Button>
        </div>
      </Box>
      <Box sx={{ height: 630, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <DeleteFuelingModal fueling={selectFueling} open={open} setOpen={setOpen} />
      <CreateFuelingModal openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <UpdateFuelingModal fueling={selectFueling} openUp={openUp} setOpenUp={setOpenUp} />
    </>
  )
}
