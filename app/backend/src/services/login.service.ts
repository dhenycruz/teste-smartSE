import { compareSync } from 'bcryptjs'
import { createToken, authToken } from '../jwt'
import UserModel from '../models/user.model'
import { type User } from '../interfaces/user'

const model = new UserModel()

interface ReturnSuccessLogin {
  user: User
  token: string
}

interface ReturnAuth {
  auth: boolean
  user: User
}

export const logining = async (cpf: string, password: string): Promise <false | ReturnSuccessLogin> => {
  const user = await model.getUserCPF(cpf)
  const getPassword = (user?.password != null) ? user?.password : ''

  const verifyPassword = compareSync(password, getPassword)

  if (!verifyPassword) return false

  if (user !== null) {
    const token = createToken(user)

    delete user.password

    if (token !== false) {
      return {
        user,
        token
      }
    }
  }

  return false
}

export const validateLogin = async (token: string): Promise<false | ReturnAuth> => {
  return await authToken(token)
}
