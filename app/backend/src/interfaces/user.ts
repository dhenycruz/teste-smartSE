export interface User {
  id?: number
  name: string
  email: string
  cpf: string
  password?: string
}

export interface UserBody {
  name: string
  email: string
  cpf: string
  password: string
}

export interface UserBodyUpdate {
  name: string
  email: string
  cpf: string
}
