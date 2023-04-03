import React, { useEffect, useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
// import { type IUser } from '../interfaces/user'
import api from '../axios/api'
import { GlobalContext } from '../context/globalContext'
import { type IUser } from '../interfaces/user'
import DeleteUserModal from './modals/delete/deleteUser'
import CreateUserModal from './modals/create/createUser'
import UpdateUserModal from './modals/update/updateUser'

export default function TableUser (): React.ReactElement {
  const { users, setUsers } = useContext(GlobalContext)
  const [open, setOpen] = useState<boolean>(false)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [openUp, setOpenUp] = useState<boolean>(false)
  const [selectUser, setSelectUser] = useState<IUser | null>(null)

  const handleOpen = (user: IUser): void => {
    setSelectUser(user)
    setOpen(true)
  }

  const handleOpenUp = (user: IUser): void => {
    setSelectUser(user)
    setOpenUp(true)
  }

  const handleOpenAdd = (): void => {
    setOpenAdd(true)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 200
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300
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
          onClick={ () => { handleOpenUp(params.row) }}
        >
          <EditIcon />
        </Button>
      )
    }
  ]

  const rows = users

  useEffect(() => {
    void api.get('/users')
      .then(({ data }) => {
        setUsers(data.data)
      })
  }, [])

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h1>Usuários({users.length})</h1>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenAdd}
          >
            Adicionar novo Usuário
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
      <DeleteUserModal user={selectUser} open={open} setOpen={setOpen} />
      <CreateUserModal openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <UpdateUserModal user={selectUser} openUp={openUp} setOpenUp={setOpenUp} />
    </>
  )
}
