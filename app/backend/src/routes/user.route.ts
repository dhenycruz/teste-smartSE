/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserController from '../controllers/user.controller'

class UserRouter {
  public router: Router
  private readonly controller: UserController

  constructor () {
    this.router = Router()
    this.controller = new UserController()
  }

  async addRoute (route: string = this.controller.route): Promise<void> {
    this.router.get(route, this.controller.getAllUser)
    this.router.get(`${route}/:id`, this.controller.getUser)
    this.router.post(route, this.controller.createUser)
    this.router.put(`${route}/:id`, this.controller.updateUser)
    this.router.delete(`${route}/:id`, this.controller.deleteUser)
  }
}

export default UserRouter
