import UserRouter from './routes/user.route'
import App from './app'
import dotenv from 'dotenv'

dotenv.config()

const { PORT } = process.env

// const userController = new UserController()
const userRouter = new UserRouter()

void userRouter.addRoute()

App.addRouter(userRouter.router)

App.startServer(PORT)
