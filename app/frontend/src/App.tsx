import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import DahsBoard from './pages/Dashboard'

const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/dashboard' element={ <DahsBoard />} />
    </Routes>
  )
}

export default App
