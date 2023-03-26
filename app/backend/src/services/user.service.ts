import UserModel from '../models/user.model'
import { type UserBody, type User, type UserBodyUpdate } from '../interfaces/user'

class UserService {
  private readonly model: UserModel

  constructor () {
    this.model = new UserModel()
  }

  async getAllUsers (): Promise <User[]> {
    return await this.model.getAllUsers()
  }

  async getUser (id: number): Promise<User | null> {
    return await this.model.getUser(id)
  }

  async deleteUser (id: number): Promise<true | false> {
    return await this.model.delete(id)
  }

  async createUser (body: UserBody): Promise<User | null> {
    return await this.model.create(body)
  }

  async updateUser (id: number, body: UserBodyUpdate): Promise<User | null> {
    return await this.model.update(id, body)
  }
}

export default new UserService()
