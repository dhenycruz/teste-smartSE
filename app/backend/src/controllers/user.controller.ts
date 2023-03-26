import { type Request, type Response } from 'express'
import UserService from '../services/user.service'

class UserController {
  private readonly _route: string
  public errorServer: string

  constructor () {
    this._route = '/users'
    this.errorServer = 'Internal Server Error'
  }

  get route (): string {
    return this._route
  }

  async getAllUser (_req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers()
      return res.status(200).json({ data: users })
    } catch (_e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async getUser (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const user = await UserService.getUser(Number(id))
      if (user !== null) {
        return res.status(200).json(user)
      }
      return res.status(200).json({ message: 'Nenhum Usuário encontrado.' })
    } catch (_e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async createUser (req: Request, res: Response): Promise<Response> {
    const { body } = req

    try {
      const user = await UserService.createUser(body)
      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user })
    } catch (_e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async updateUser (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { body } = req

    try {
      const user = await UserService.updateUser(Number(id), body)
      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', user })
    } catch (_e) {
      return res.status(500).json({ error: this.errorServer })
    }
  }

  async deleteUser (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      await UserService.deleteUser(Number(id))
      return res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default UserController
