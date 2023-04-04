import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { type User } from '../interfaces/user'
import UserModel from '../models/user.model'

dotenv.config()
const model = new UserModel()

interface Data {
  data: User
}

interface ReturnAuth {
  auth: boolean
  user: User
}

export const createToken = (user: User): string | false => {
  const secret = process.env.SECRET_KEY

  if (secret !== undefined) {
    const token = jwt.sign({ data: user }, secret, { expiresIn: '2h', algorithm: 'HS256' })
    return token
  }

  return false
}

export const authToken = async (token: string): Promise<false | ReturnAuth> => {
  const secret = process.env.SECRET_KEY

  try {
    if (secret !== undefined) {
      const decodec = jwt.verify(token, secret) as Data
      const user = await model.getUserCPF(decodec.data.cpf)

      if (user === null) return false

      return {
        auth: true,
        user: decodec.data
      }
    }
    return false
  } catch (e) {
    console.log(e)
    return false
  }
}
