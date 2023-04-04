import { type Request, type Response } from 'express'
import fuelingService from '../services/fueling.service'

class FuelingController {
  private readonly _route: string
  private readonly errorServer: string

  constructor () {
    this._route = '/fuelings'
    this.errorServer = 'Internal Server Error'
  }

  get route (): string {
    return this._route
  }

  async getAllFueling (_req: Request, res: Response): Promise <Response> {
    try {
      const fueling = await fuelingService.getAllFueling()
      return res.status(200).json({ data: fueling })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async getFueling (req: Request, res: Response): Promise <Response> {
    const { id } = req.params

    try {
      const fueling = await fuelingService.getFueling(Number(id))
      return res.status(200).json(fueling)
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async createFueling (req: Request, res: Response): Promise <Response> {
    const { body } = req

    try {
      const fueling = await fuelingService.createFueling(body)
      return res.status(201).json({ message: 'Abastecimento cadastrado com sucesso!', fueling })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async updateFueling (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { body } = req

    try {
      const fueling = await fuelingService.updateFueling(Number(id), body)
      return res.status(200).json({ message: 'Abastecimento atualizado com sucesso!', fueling })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async deleteFueliong (req: Request, res: Response): Promise <Response> {
    const { id } = req.params

    try {
      await fuelingService.deleteFueling(Number(id))
      return res.status(200).json({ message: 'Abastecimento deletado com sucesso!' })
    } catch (e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }
}

export default FuelingController
