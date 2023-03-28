/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserController from '../controllers/user.controller'
import { verifyExistsUserCPF, verifyExistsUserEmail, verifyExistsUser } from '../middleware/verifyUser'

class UserRouter {
  public router: Router
  private readonly controller: UserController

  constructor () {
    this.router = Router()
    this.controller = new UserController()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.get(route, this.controller.getAllUser)
    this.router.get(`${route}/:id`, this.controller.getUser)
    this.router.post(route, verifyExistsUserEmail, verifyExistsUserCPF, this.controller.createUser)
    this.router.put(`${route}/:id`, verifyExistsUser, this.controller.updateUser)
    this.router.delete(`${route}/:id`, verifyExistsUser, this.controller.deleteUser)
  }
}

export default UserRouter
