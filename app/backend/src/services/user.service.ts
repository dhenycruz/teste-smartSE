import { genSalt, hash } from 'bcryptjs'
import UserModel from '../models/user.model'
import { type UserBody, type User, type UserBodyUpdate } from '../interfaces/user'

class UserService {
  private readonly model: UserModel

  constructor () {
    this.model = new UserModel()
  }

  async getAllUsers (): Promise<User[]> {
    return await this.model.getAllUsers()
  }

  async getUser (id: number): Promise<User | null> {
    return await this.model.getUser(id)
  }

  async deleteUser (id: number): Promise<true | false> {
    return await this.model.delete(id)
  }

  async createUser (body: UserBody): Promise<User | null> {
    const { name, cpf, email, password } = body
    const salt = await genSalt(10)
    const newPassword = await hash(password, salt)
    return await this.model.create({
      name,
      cpf,
      email,
      password: newPassword
    })
  }

  async updateUser (id: number, body: UserBodyUpdate): Promise<User | null> {
    return await this.model.update(id, body)
  }
}

export default new UserService()
