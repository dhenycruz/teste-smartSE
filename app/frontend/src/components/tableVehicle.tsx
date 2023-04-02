import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Button, Avatar } from '@mui/material'
import api from '../axios/api'
import { type Vehicle } from '../interfaces/vehicles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import FeedIcon from '@mui/icons-material/Feed'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'image',
    headerName: '',
    width: 80,
    editable: false,
    renderCell: (params) => (
      <Avatar alt="Remy Sharp" src={params.value} />
    )
  },
  {
    field: 'modelo',
    headerName: 'Modelo',
    width: 120,
    editable: false
  },
  {
    field: 'marca',
    headerName: 'Marca',
    width: 150,
    editable: false
  },
  {
    field: 'cor',
    headerName: 'Cor',
    width: 100,
    editable: false
  },
  {
    field: 'placa',
    headerName: 'Placa',
    width: 150,
    editable: false
  },
  {
    field: 'localizacao',
    headerName: 'Cidade/Estado',
    width: 120,
    editable: false
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
      >
        <EditIcon />
      </Button>
    )
  },
  {
    field: 'detalhes',
    description: 'Detalhes do Veículo',
    width: 100,
    renderCell: (params) => (
      <Button
        variant="outlined"
        color="success"
        size="small"
      >
        <FeedIcon />
      </Button>
    )
  }
]

interface IVehicle extends Vehicle {
  abastecimentos?: number
  deletar?: number
  editar?: number
  detalhes?: number
}
export default function TableVehicle (): React.ReactElement {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  const rows = vehicles.map((vehicle: IVehicle) => {
    vehicle.abastecimentos = vehicle.id
    vehicle.deletar = vehicle.id
    vehicle.editar = vehicle.id
    vehicle.detalhes = vehicle.id
    return vehicle
  })

  useEffect(() => {
    void api.get('/vehicles')
      .then(({ data }) => {
        console.log(data)
        setVehicles(data.data)
      })
      .catch((res) => {
        console.log(res)
      })
  }, [])
  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h1>Veículos({vehicles.length})</h1>
        <div>
          <Button variant="outlined" color="primary">Adicionar novo Veículo</Button>
        </div>
      </Box>
      <Box height={600} sx={{ width: '100%' }}>
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
    </>
  )
}
