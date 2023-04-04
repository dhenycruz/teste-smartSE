import { type Request, type Response, type NextFunction } from 'express'
import FuelingModel from '../models/fueling.model'

const model = new FuelingModel()

export const verifyExistsFueling = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { id } = req.params
  const fueling = await model.getFueling(Number(id))

  if (fueling === null) return res.status(409).json({ error: 'Abastecimento não encontrado.' })

  next()
}
