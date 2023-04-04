import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/globalContext'
import BasePage from '../components/basePage'
// import TableCar from '../components/table'

const DahsBoard = (): React.ReactElement => {
  const { validateLogin } = useContext(GlobalContext)

  useEffect(() => {
    validateLogin()
  }, [])

  return (
    <>
      <BasePage />
    </>
  )
}

export default DahsBoard
