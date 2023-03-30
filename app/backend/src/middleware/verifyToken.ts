import { type Request, type Response, type NextFunction } from 'express'
import { authToken } from '../jwt'

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { authorization } = req.headers

  if (authorization === undefined) return res.status(401).json({ message: 'Not authorized' })

  const result = await authToken(authorization)

  if (result === false) return res.status(401).json({ message: 'Token invalid' })

  next()
}
