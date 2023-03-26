import express, { type Router } from 'express'

class App {
  public app: express.Application

  constructor () {
    this.app = express()
    this.app.use(express.json())
  }

  startServer (PORT: string | number = 3001): void {
    this.app.listen(PORT, () => {
      console.log(`Server running in the port ${PORT}`)
    })
  }

  addRouter (router: Router): void {
    this.app.use(router)
  }

  getApp (): express.Application {
    return this.app
  }
}

export default new App()
