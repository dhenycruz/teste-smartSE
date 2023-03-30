/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserController from '../controllers/user.controller'
import { verifyExistsUserCPF, verifyExistsUserEmail, verifyExistsUser } from '../middleware/verifyUser'
import { verifyToken } from '../middleware/verifyToken'

class UserRouter {
  public router: Router
  private readonly controller: UserController

  constructor () {
    this.router = Router()
    this.controller = new UserController()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.get(route, verifyToken, this.controller.getAllUser)
    this.router.get(`${route}/:id`, verifyToken, this.controller.getUser)
    this.router.post(route, verifyToken, verifyExistsUserEmail, verifyExistsUserCPF, this.controller.createUser)
    this.router.put(`${route}/:id`, verifyToken, verifyExistsUser, this.controller.updateUser)
    this.router.delete(`${route}/:id`, verifyToken, verifyExistsUser, this.controller.deleteUser)
  }
}

export default UserRouter
