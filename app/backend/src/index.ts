import UserRouter from './routes/user.route'
import VehicleRouter from './routes/vehicle.route'
import FuelingRoute from './routes/fueling.route'
import App from './app'
import dotenv from 'dotenv'
import LoginRoute from './routes/login.route'

dotenv.config()

const { PORT } = process.env

const loginRouter = new LoginRoute()
const userRouter = new UserRouter()
const vehicleRouter = new VehicleRouter()
const fuelingRoute = new FuelingRoute()

loginRouter.addRoute()
userRouter.addRoute()
vehicleRouter.addRoute()
fuelingRoute.addRoute()

App.addRouter(loginRouter.router)
App.addRouter(userRouter.router)
App.addRouter(vehicleRouter.router)
App.addRouter(fuelingRoute.router)
App.startServer(PORT)
