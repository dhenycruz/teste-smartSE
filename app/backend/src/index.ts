import UserRouter from './routes/user.route'
import VehicleRouter from './routes/vehicle.route'
import App from './app'
import dotenv from 'dotenv'

dotenv.config()

const { PORT } = process.env

// const userController = new UserController()
const userRouter = new UserRouter()
const carRouter = new VehicleRouter()

userRouter.addRoute()
carRouter.addRoute()

App.addRouter(userRouter.router)
App.addRouter(carRouter.router)
App.startServer(PORT)
