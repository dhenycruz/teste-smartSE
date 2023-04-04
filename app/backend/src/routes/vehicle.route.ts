/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CarController from '../controllers/vehicle.controller'
import { verifyExistsVechicle, verifyExistsVechicleChassi, verifyExistsVechicleRenavan } from '../middleware/verifyVehicle'
import { verifyToken } from '../middleware/verifyToken'

class CarRouter {
  public router: Router
  private readonly controller: CarController

  constructor () {
    this.router = Router()
    this.controller = new CarController()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.get(route, verifyToken, this.controller.getAllVehicles)
    this.router.get(`${route}/:id`, verifyToken, this.controller.getVehicle)
    this.router.post(route, verifyToken, verifyExistsVechicleRenavan, verifyExistsVechicleChassi, this.controller.createVehicle)
    this.router.patch(`${route}/:id`, verifyToken, verifyExistsVechicle, this.controller.updateVehicle)
    this.router.delete(`${route}/:id`, verifyToken, verifyExistsVechicle, this.controller.deleteVehicle)
  }
}

export default CarRouter
