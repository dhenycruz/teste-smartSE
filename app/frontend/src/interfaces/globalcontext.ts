import { type Dispatch, type SetStateAction } from 'react'
import { type IUser } from './user'

export interface IGlobalContext {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  saveLoginToken: (user: IUser, token: string) => void
  validateLogin: () => boolean
  logout: () => void
}
