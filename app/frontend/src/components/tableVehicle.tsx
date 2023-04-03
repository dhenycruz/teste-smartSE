import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Button, Avatar } from '@mui/material'
import api from '../axios/api'
import { type Vehicle } from '../interfaces/vehicles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import FeedIcon from '@mui/icons-material/Feed'
import DeleteVehicleModal from './modals/delete/deleteVehicle'
import CreateVehicleModal from './modals/create/createVehicle'
import CreateFuelingModal from './modals/create/createFueling'
import { GlobalContext } from '../context/globalContext'
import UpdateVehicleModal from './modals/update/updateVehicle'
import DetailsVehicleModal from './modals/details/detailsVehicle'

interface IVehicle extends Vehicle {
  abastecimentos?: number
  deletar?: number
  editar?: number
  detalhes?: number
}

export default function TableVehicle (): React.ReactElement {
  const { vehicles, setVehicles } = useContext(GlobalContext)
  const [open, setOpen] = useState<boolean>(false)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [openAddFueling, setOpenAddFueling] = useState<boolean>(false)
  const [openUp, setOpenUp] = useState<boolean>(false)
  const [openDetails, setOpenDetails] = useState<boolean>(false)
  const [selectVehicle, setSelectVehicle] = useState<Vehicle | null>(null)

  const handleOpen = (vehicle: Vehicle): void => {
    setSelectVehicle(vehicle)
    setOpen(true)
  }

  const handleOpenUp = (vehicle: Vehicle): void => {
    setSelectVehicle(vehicle)
    setOpenUp(true)
  }

  const handleOpenDetails = (vehicle: Vehicle): void => {
    setSelectVehicle(vehicle)
    setOpenDetails(true)
  }

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
          onClick={ () => {
            handleOpen(params.row)
          }}
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
          onClick={ () => {
            handleOpenUp(params.row)
          }}
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
          onClick={ () => {
            handleOpenDetails(params.row)
          }}
        >
          <FeedIcon />
        </Button>
      )
    }
  ]

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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { setOpenAdd(true) }}
            sx={{ mr: 2 }}
          >
            Adicionar novo Veículo
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { setOpenAddFueling(true) }}
          >
            Abaster um carro
          </Button>
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
      <DeleteVehicleModal vehicle={selectVehicle} open={open} setOpen={setOpen} />
      <CreateVehicleModal openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <UpdateVehicleModal vehicle={selectVehicle} openUp={openUp} setOpenUp={setOpenUp} />
      <DetailsVehicleModal vehicle={selectVehicle} openDetails={openDetails} setOpenDetails={setOpenDetails} />
      <CreateFuelingModal openAdd={openAddFueling} setOpenAdd={setOpenAddFueling} />
    </>
  )
}
