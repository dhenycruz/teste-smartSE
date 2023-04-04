import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type IUser } from '../interfaces/user'
import { type IGlobalContext } from '../interfaces/globalcontext'
import api from '../axios/api'
import { type Vehicle } from '../interfaces/vehicles'
import { type Fueling } from '../interfaces/fueling'

const defaultValues = {
  loading: true,
  setLoading: () => {},
  saveLoginToken: () => {},
  validateLogin: () => false,
  logout: () => {},
  vehicles: [],
  setVehicles: () => {},
  fuelings: [],
  setFuelings: () => {},
  users: [],
  setUsers: () => {}
}

export const GlobalContext = createContext<IGlobalContext>(defaultValues)

export const GlobalProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [fuelings, setFuelings] = useState<Fueling[]>([])
  const [users, setUsers] = useState<IUser[]>([])

  const navigate = useNavigate()

  const redirect = (url: string): void => {
    navigate(url)
  }

  const saveLoginToken = (user: IUser, token: string): void => {
    if (localStorage !== undefined) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    }
  }

  const logout = (): void => {
    if (localStorage !== undefined) {
      localStorage.clear()
      redirect('/')
    }
  }

  const validateLogin = (): true | any => {
    if (localStorage !== undefined) {
      const token = localStorage.getItem('token')

      if (typeof token === 'string') {
        void api.get('/login',
          {
            headers: {
              Authorization: token
            }
          }
        )
          .then(({ data }) => {
            console.log('ok')
          })
          .catch(({ response }) => {
            console.log(response.data.auth)
            logout()
          })
      } else {
        redirect('/')
      }
    }
  }

  useEffect(() => {
    void api.get('/vehicles')
      .then(({ data }) => {
        setVehicles(data.data)
      })
      .catch((res) => {
        console.log(res)
      })

    void api.get('/fuelings')
      .then(({ data }) => {
        setFuelings(data.data)
      })

    void api.get('/users')
      .then(({ data }) => {
        setUsers(data.data)
      })
  }, [])

  return (
    <GlobalContext.Provider value={{
      loading,
      setLoading,
      saveLoginToken,
      validateLogin,
      logout,
      vehicles,
      setVehicles,
      fuelings,
      setFuelings,
      users,
      setUsers
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
