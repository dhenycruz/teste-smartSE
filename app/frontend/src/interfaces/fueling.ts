enum Fuel {
  diesel,
  galosina,
  alcool,
}

export interface Fueling {
  id?: number
  type_fuel: Fuel
  value: string
  quantity_fueled: string
  carId: number
  dateFueled: Date
}
