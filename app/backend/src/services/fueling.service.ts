import { type Fueling, type FuelingBody } from '../interfaces/fueling'
import FuelingModel from '../models/fueling.model'

class FuelingService {
  private readonly model: FuelingModel

  constructor () {
    this.model = new FuelingModel()
  }

  async getAllFueling (): Promise<Fueling[]> {
    return await this.model.getAllFueling()
  }

  async getFueling (id: number): Promise<Fueling | null> {
    return await this.model.getFueling(id)
  }

  async createFueling (body: FuelingBody): Promise <Fueling | null> {
    return await this.model.create(body)
  }

  async updateFueling (id: number, body: FuelingBody): Promise <Fueling | null> {
    return await this.model.update(id, body)
  }

  async deleteFueling (id: number): Promise<true | false> {
    return await this.model.delete(id)
  }
}

export default new FuelingService()
