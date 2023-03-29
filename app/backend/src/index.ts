import UserRouter from './routes/user.route'
import CarRouter from './routes/car.route'
import App from './app'
import dotenv from 'dotenv'

dotenv.config()

const { PORT } = process.env

// const userController = new UserController()
const userRouter = new UserRouter()
const carRouter = new CarRouter()

userRouter.addRoute()
carRouter.addRoute()

App.addRouter(userRouter.router)
App.addRouter(carRouter.router)
App.startServer(PORT)
