import VehicleModel from '../models/vehicle.model'
import { type Vehicle, type VehicleBody } from '../interfaces/vehicle'

class VehicleService {
  private readonly model: VehicleModel

  constructor () {
    this.model = new VehicleModel()
  }

  async getAllVehicles (): Promise<Vehicle[]> {
    return await this.model.getAllVehicles()
  }

  async getVehicle (id: number): Promise<Vehicle | null> {
    return await this.model.getVehicle(id)
  }

  async createVehicle (body: VehicleBody): Promise<Vehicle | null> {
    return await this.model.create(body)
  }

  async updateVehicle (id: number, body: VehicleBody): Promise<Vehicle | null> {
    return await this.model.update(id, body)
  }

  async deleteVehicle (id: number): Promise<true | false> {
    return await this.model.delete(id)
  }
}

export default new VehicleService()
