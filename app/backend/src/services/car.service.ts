import CarModel from '../models/car.model'
import { type Car, type CarBody } from '../interfaces/car'

class CarService {
  private readonly model: CarModel

  constructor () {
    this.model = new CarModel()
  }

  async getAllCars (): Promise<Car[]> {
    return await this.model.getAllCars()
  }

  async getCar (id: number): Promise<Car | null> {
    return await this.model.getCar(id)
  }

  async createCar (body: CarBody): Promise<Car | null> {
    return await this.model.create(body)
  }

  async updateCar (id: number, body: CarBody): Promise<Car | null> {
    return await this.model.update(id, body)
  }

  async deleteCar (id: number): Promise<true | false> {
    return await this.model.delete(id)
  }
}

export default new CarService()
