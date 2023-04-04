/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import FuelingController from '../controllers/fueling.controller'
import { verifyExistsFueling } from '../middleware/verifyFuelingDate'
import { verifyToken } from '../middleware/verifyToken'

class FuelingRoute {
  public router: Router
  private readonly controller: FuelingController

  constructor () {
    this.router = Router()
    this.controller = new FuelingController()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.get(route, verifyToken, this.controller.getAllFueling)
    this.router.get(`${route}/:id`, verifyToken, verifyExistsFueling, this.controller.getFueling)
    this.router.post(route, this.controller.createFueling)
    this.router.put(`${route}/:id`, verifyToken, verifyExistsFueling, this.controller.updateFueling)
    this.router.delete(`${route}/:id`, verifyToken, verifyExistsFueling, this.controller.deleteFueliong)
  }
}

export default FuelingRoute
