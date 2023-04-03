import prisma from '../../prisma/connection'
import { type Vehicle, type VehicleBody } from '../interfaces/vehicle'

class vehicleModel {
  async getVehicleChassi (chassi: string): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: {
        chassi
      },
      select: {
        id: true,
        cor: true,
        potencia: true,
        motor: true,
        placa: true,
        localizacao: true,
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

  async getVehicleRenavan (renavan: string): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: {
        renavan
      },
      select: {
        id: true,
        cor: true,
        potencia: true,
        motor: true,
        placa: true,
        localizacao: true,
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

  async getAllVehicles (): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      select: {
        id: true,
        cor: true,
        potencia: true,
        motor: true,
        placa: true,
        localizacao: true,
        modelo: true,
        anoFabricacao: true,
        anoModelo: true,
        marca: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true,
        Fuelings: {
          select: {
            id: true,
            type_fuel: true,
            value: true,
            quantity_fueled: true,
            dateFueled: true,
            carId: true
          }
        }
      }
    })
  }

  async getVehicle (id: number): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        cor: true,
        potencia: true,
        motor: true,
        placa: true,
        localizacao: true,
        modelo: true,
        anoFabricacao: true,
        anoModelo: true,
        marca: true,
        renavan: true,
        chassi: true,
        image: true,
        userId: true,
        Fuelings: {
          select: {
            id: true,
            type_fuel: true,
            value: true,
            quantity_fueled: true,
            dateFueled: true,
            carId: true
          }
        }
      }
    })
  }

  async create (body: VehicleBody): Promise <Vehicle | null> {
    return await prisma.vehicle.create({
      data: body,
      select: {
        id: true,
        cor: true,
        potencia: true,
        motor: true,
        placa: true,
        localizacao: true,
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

  async update (id: number, body: VehicleBody): Promise<Vehicle | null> {
    return await prisma.vehicle.update({
      where: { id },
      data: body,
      select: {
        id: true,
        cor: true,
        potencia: true,
        motor: true,
        placa: true,
        localizacao: true,
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

  async delete (id: number): Promise<true | false> {
    try {
      await prisma.vehicle.delete({
        where: { id }
      })

      return true
    } catch (_e) {
      return false
    }
  }
}

export default vehicleModel
