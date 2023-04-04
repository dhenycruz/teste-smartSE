import { type Dispatch, type SetStateAction } from 'react'
import { type IUser } from './user'
import { type Vehicle } from './vehicles'
import { type Fueling } from './fueling'

export interface IGlobalContext {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  saveLoginToken: (user: IUser, token: string) => void
  validateLogin: () => boolean
  logout: () => void
  vehicles: Vehicle[]
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>
  fuelings: Fueling[]
  setFuelings: Dispatch<SetStateAction<Fueling[]>>
  users: IUser[]
  setUsers: Dispatch<SetStateAction<IUser[]>>
}
