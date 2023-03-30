import prisma from '../../prisma/connection'
import { type UserBodyUpdate, type User, type UserBody } from '../interfaces/user'

class UserModel {
  async getAllUsers (): Promise<User[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true
      }
    })
  }

  async getUser (id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true
      }
    })
  }

  async getUserEmail (email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true
      }
    })
  }

  async getUserCPF (cpf: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        cpf
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        password: true
      }
    })
  }

  async create (body: UserBody): Promise <User | null> {
    return await prisma.user.create({
      data: body,
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true
      }
    })
  }

  async update (id: number, body: UserBodyUpdate): Promise <User | null> {
    return await prisma.user.update({
      where: { id },
      data: body,
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true
      }
    })
  }

  async delete (id: number): Promise<true | false> {
    try {
      await prisma.user.delete({
        where: { id }
      })

      return true
    } catch (_e) {
      return false
    }
  }
}

export default UserModel
