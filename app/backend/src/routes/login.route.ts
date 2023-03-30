/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import Login from '../controllers/login.controller'

class LoginRoute {
  public router: Router
  private readonly controller: Login

  constructor () {
    this.router = Router()
    this.controller = new Login()
  }

  addRoute (route: string = this.controller.route): void {
    this.router.post(route, this.controller.logining)
    this.router.get(route, this.controller.validate)
  }
}

export default LoginRoute
