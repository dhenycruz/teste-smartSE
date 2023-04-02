import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { type IUser } from '../interfaces/user'
import api from '../axios/api'

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
  }
]

export default function TableUser (): React.ReactElement {
  const [users, setUsers] = useState<IUser[]>([])

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
        <h1>Usuários(4)</h1>
        <div>
          <Button variant="outlined" color="primary">Adicionar novo Usuário</Button>
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
    </>
  )
}
