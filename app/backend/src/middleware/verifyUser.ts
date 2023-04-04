import { type Request, type Response, type NextFunction } from 'express'
import UserModel from '../models/user.model'

const model = new UserModel()

export const verifyExistsUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { email } = req.body
  const user = await model.getUserEmail(email)

  if (user !== null) return res.status(409).json({ error: 'Email já cadastrado.' })

  next()
}

export const verifyExistsUserCPF = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { cpf } = req.body

  const user = await model.getUserCPF(cpf)

  if (user !== null) return res.status(409).json({ error: 'CPF já cadastrado.' })

  next()
}

export const verifyExistsUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { id } = req.params

  const user = await model.getUser(Number(id))

  if (user === null) return res.status(404).json({ error: 'Usuário não encontrado.' })

  next()
}
