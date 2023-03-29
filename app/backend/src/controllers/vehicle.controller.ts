import { type Request, type Response } from 'express'
import VehicleService from '../services/vehicle.service'

class VehicleController {
  private readonly _route: string
  public errorServer: string

  constructor () {
    this._route = '/Vehicles'
    this.errorServer = 'Internal Server Error'
  }

  get route (): string {
    return this._route
  }

  async getAllVehicles (_req: Request, res: Response): Promise<Response> {
    try {
      const Vehicles = await VehicleService.getAllVehicles()
      return res.status(200).json({ data: Vehicles })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async getVehicle (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const Vehicle = await VehicleService.getVehicle(Number(id))

      if (Vehicle !== null) return res.status(200).json(Vehicle)

      return res.status(200).json({ message: 'Veículo não encontrado.' })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async createVehicle (req: Request, res: Response): Promise<Response> {
    const { body } = req

    try {
      const Vehicle = await VehicleService.createVehicle(body)
      return res.status(201).json({ message: 'Veículo cadastrado com sucesso!', Vehicle })
    } catch (e) {
      // console.log(e)
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async updateVehicle (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { body } = req

    try {
      const Vehicle = await VehicleService.updateVehicle(Number(id), body)
      return res.status(200).json({ message: 'Veículo atualizado com sucesso!', Vehicle })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async deleteVehicle (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await VehicleService.deleteVehicle(Number(id))
      return res.status(200).json({ message: 'Veículo deletado com sucesso!' })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }
}

export default VehicleController
