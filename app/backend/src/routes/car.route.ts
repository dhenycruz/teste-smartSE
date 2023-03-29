/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CarController from '../controllers/car.controller'
import { verifyExistsCar, verifyExistsCarChassi, verifyExistsCarRenavan } from '../middleware/verifyCar'

class CarRouter {
  public router: Router
  private readonly controller: CarController

  constructor () {
    this.router = Router()
    this.controller = new CarController()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.get(route, this.controller.getAllCars)
    this.router.get(`${route}/:id`, this.controller.getCar)
    this.router.post(route, verifyExistsCarRenavan, verifyExistsCarChassi, this.controller.createCar)
    this.router.put(`${route}/:id`, verifyExistsCar, verifyExistsCarRenavan, verifyExistsCarChassi, this.controller.updateCar)
    this.router.delete(`${route}/:id`, verifyExistsCar, this.controller.deleteCar)
  }
}

export default CarRouter
