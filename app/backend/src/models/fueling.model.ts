import prisma from '../../prisma/connection'
import { type FuelingBody, type Fueling } from '../interfaces/fueling'

class FuelingModel {
  async getAllFueling (): Promise<Fueling[]> {
    return await prisma.fuelingData.findMany({
      select: {
        id: true,
        type_fuel: true,
        value: true,
        quantity_fueled: true,
        carId: true,
        dateFueled: true
      }
    })
  }

  async getFueling (id: number): Promise <Fueling | null> {
    return await prisma.fuelingData.findUnique({
      where: { id },
      select: {
        id: true,
        type_fuel: true,
        value: true,
        quantity_fueled: true,
        carId: true,
        dateFueled: true
      }
    })
  }

  async create (body: FuelingBody): Promise <Fueling | null> {
    return await prisma.fuelingData.create({
      data: body,
      select: {
        id: true,
        type_fuel: true,
        value: true,
        quantity_fueled: true,
        carId: true,
        dateFueled: true
      }
    })
  }

  async update (id: number, body: FuelingBody): Promise<Fueling | null> {
    return await prisma.fuelingData.update({
      where: { id },
      data: body,
      select: {
        id: true,
        type_fuel: true,
        value: true,
        quantity_fueled: true,
        carId: true,
        dateFueled: true
      }
    })
  }

  async delete (id: number): Promise<true | false> {
    try {
      await prisma.fuelingData.delete({ where: { id } })
      return true
    } catch (_e) {
      return false
    }
  }
}

export default FuelingModel
