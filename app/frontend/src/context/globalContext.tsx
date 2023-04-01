import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type IUser } from '../interfaces/user'
import { type IGlobalContext } from '../interfaces/globalcontext'
import api from '../axios/api'

const defaultValues = {
  loading: true,
  setLoading: () => {},
  saveLoginToken: () => {},
  validateLogin: () => false,
  logout: () => {}
}

export const GlobalContext = createContext<IGlobalContext>(defaultValues)

export const GlobalProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [loading, setLoading] = useState(false)

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
            console.log(data)
          })
          .catch(({ response }) => {
            console.log(response.data.auth)
            logout()
          })
      }
    }
  }

  return (
    <GlobalContext.Provider value={{
      loading,
      setLoading,
      saveLoginToken,
      validateLogin,
      logout
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
