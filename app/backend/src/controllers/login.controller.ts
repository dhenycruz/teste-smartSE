import { type Request, type Response } from 'express'
import { logining, validateLogin } from '../services/login.service'

class Login {
  private readonly _route: string
  public errorServer: string

  constructor () {
    this._route = '/login'
    this.errorServer = 'Internal  Server Error'
  }

  get route (): string {
    return this._route
  }

  async logining (req: Request, res: Response): Promise<Response> {
    const { cpf, password } = req.body
    const result = await logining(cpf, password)

    if (result === false) return res.status(401).json({ message: 'cpf ou senha incorretas' })

    return res.status(200).json(result)
  }

  async validate (req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers
    if (authorization === undefined) return res.status(401).json({ message: 'Not authorized' })

    const result = await validateLogin(authorization)

    if (result === false) return res.status(401).json({ message: 'Not authorization!' })

    return res.status(201).json(result)
  }
}

export default Login
