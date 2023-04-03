import { type Request, type Response, type NextFunction } from 'express'
import VehicleModel from '../models/vehicle.model'

const model = new VehicleModel()

export const verifyExistsVechicleChassi = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { chassi } = req.body
  const car = await model.getVehicleChassi(chassi)

  if (car !== null) return res.status(409).json({ error: 'Chassi já cadastrado' })

  next()
}

export const verifyExistsVechicleRenavan = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { renavan } = req.body
  const car = await model.getVehicleRenavan(renavan)

  if (car !== null) return res.status(409).json({ error: 'Renavan já cadastrado' })

  next()
}

export const verifyExistsVechicle = async (req: Request, res: Response, next: NextFunction): Promise <Response | undefined> => {
  const { id } = req.params

  const car = await model.getVehicle(Number(id))

  if (car === null) return res.status(404).json({ error: 'Carro não encontrado.' })

  next()
}
