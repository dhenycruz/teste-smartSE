import { type Decimal } from '@prisma/client/runtime'
import { type Fuel } from '@prisma/client'

export interface Fueling {
  id?: number
  type_fuel: Fuel
  value: Decimal
  quantity_fueled: Decimal
  carId: number
}

export interface FuelingBody {
  type_fuel: Fuel
  value: Decimal
  quantity_fueled: Decimal
  carId: number
}
