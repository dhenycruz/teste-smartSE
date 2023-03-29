import { type Request, type Response, type NextFunction } from 'express'
import CarModel from '../models/car.model'

const model = new CarModel()

export const verifyExistsCarChassi = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { chassi } = req.body
  const car = await model.getCarChassi(chassi)

  if (car !== null) return res.status(409).json({ error: 'Chassi já cadastrado' })

  next()
}

export const verifyExistsCarRenavan = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { renavan } = req.body
  const car = await model.getCarRenavan(renavan)

  if (car !== null) return res.status(409).json({ error: 'Renavan já cadastrado' })
}

export const verifyExistsCar = async (req: Request, res: Response, next: NextFunction): Promise <Response | undefined> => {
  const { id } = req.params

  const car = await model.getCar(Number(id))

  if (car === null) return res.status(404).json({ error: 'Carro não encontrado.' })

  next()
}
