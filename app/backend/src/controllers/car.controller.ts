import { type Request, type Response } from 'express'
import CarService from '../services/car.service'

class CarController {
  private readonly _route: string
  public errorServer: string

  constructor () {
    this._route = '/cars'
    this.errorServer = 'Internal Server Error'
  }

  get route (): string {
    return this._route
  }

  async getAllCars (_req: Request, res: Response): Promise<Response> {
    try {
      const cars = await CarService.getAllCars()
      return res.status(200).json({ data: cars })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async getCar (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const car = await CarService.getCar(Number(id))

      if (car !== null) return res.status(200).json(car)

      return res.status(200).json({ message: 'Usuário não encontrado.' })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async createCar (req: Request, res: Response): Promise<Response> {
    const { body } = req

    try {
      const car = await CarService.createCar(body)
      return res.status(201).json({ message: 'Carro cadastrado com sucesso!', car })
    } catch (e) {
      // console.log(e)
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async updateCar (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { body } = req

    try {
      const car = await CarService.updateCar(Number(id), body)
      return res.status(200).json({ message: 'Carro atualizado com sucesso!', car })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async deleteCar (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await CarService.deleteCar(Number(id))
      return res.status(200).json({ message: 'Carro deletado com sucesso!' })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }
}

export default CarController
