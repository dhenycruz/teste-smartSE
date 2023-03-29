/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CarController from '../controllers/vehicle.controller'
import { verifyExistsVechicle, verifyExistsVechicleChassi, verifyExistsVechicleRenavan } from '../middleware/verifyVehicle'

class CarRouter {
  public router: Router
  private readonly controller: CarController

  constructor () {
    this.router = Router()
    this.controller = new CarController()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.get(route, this.controller.getAllVehicles)
    this.router.get(`${route}/:id`, this.controller.getVehicle)
    this.router.post(route, verifyExistsVechicleRenavan, verifyExistsVechicleChassi, this.controller.createVehicle)
    this.router.put(`${route}/:id`, verifyExistsVechicle, verifyExistsVechicleRenavan, verifyExistsVechicleChassi, this.controller.updateVehicle)
    this.router.delete(`${route}/:id`, verifyExistsVechicle, this.controller.deleteVehicle)
  }
}

export default CarRouter
