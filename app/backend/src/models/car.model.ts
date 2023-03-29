import prisma from '../../prisma/connection'
import { type Car, type CarBody } from '../interfaces/car'

class CarModel {
  async getCarChassi (chassi: string): Promise<Car | null> {
    return await prisma.car.findUnique({
      where: {
        chassi
      },
      select: {
        id: true,
        modelo: true,
        anoFabricacao: true,
        anoModelo: true,
        marca: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true
      }
    })
  }

  async getCarRenavan (renavan: string): Promise<Car | null> {
    return await prisma.car.findUnique({
      where: {
        renavan
      },
      select: {
        id: true,
        modelo: true,
        anoFabricacao: true,
        anoModelo: true,
        marca: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true
      }
    })
  }

  async getAllCars (): Promise<Car[]> {
    return await prisma.car.findMany({
      select: {
        id: true,
        modelo: true,
        anoFabricacao: true,
        anoModelo: true,
        marca: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true
      }
    })
  }

  async getCar (id: number): Promise<Car | null> {
    return await prisma.car.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        modelo: true,
        anoFabricacao: true,
        anoModelo: true,
        marca: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true
      }
    })
  }

  async create (body: CarBody): Promise <Car | null> {
    return await prisma.car.create({
      data: body,
      select: {
        id: true,
        marca: true,
        modelo: true,
        anoModelo: true,
        anoFabricacao: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true
      }
    })
  }

  async update (id: number, body: CarBody): Promise<Car | null> {
    return await prisma.car.update({
      where: { id },
      data: body,
      select: {
        id: true,
        marca: true,
        modelo: true,
        anoModelo: true,
        anoFabricacao: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true
      }
    })
  }

  async delete (id: number): Promise<true | false> {
    try {
      await prisma.car.delete({
        where: { id }
      })

      return true
    } catch (_e) {
      return false
    }
  }
}

export default CarModel
