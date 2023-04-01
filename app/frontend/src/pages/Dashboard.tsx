import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/globalContext'

const DahsBoard = (): React.ReactElement => {
  const { validateLogin } = useContext(GlobalContext)

  useEffect(() => {
    validateLogin()
  }, [])

  return (
    <h1>Dashboard</h1>
  )
}

export default DahsBoard
