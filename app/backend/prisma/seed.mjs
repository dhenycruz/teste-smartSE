import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const user = await prisma.user.upsert({
    where: { email: 'dheniarley@email.com' },
    update: {},
    create: {
      id: 1,
      email: 'dheniarley@email.com',
      name: 'Dheniarley Cruz',
      cpf: '04223688146',
      password: '$2a$10$ELtbi2ZDbjw3UZIwXk9ny.W3DgF1u6NzxizoL.1q5l0YJwxmJ/w5.'
    }
  })

  console.log(user)

  const vehicle1 = await prisma.vehicle.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      cor: 'BRANCO',
      potencia: '185 cv',
      motor: '2.0',
      placa: 'ABC-4567',
      localizacao: 'São Paulo - SP',
      marca: 'FIAT',
      modelo: 'TORO',
      anoModelo: 2018,
      anoFabricacao: 2017,
      renavan: '12345678910',
      chassi: 'ABCDEFG1234567890',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Fiat_Toro_2018_in_Punta_del_Este_%28front%29_01.jpg/300px-Fiat_Toro_2018_in_Punta_del_Este_%28front%29_01.jpg',
      userId: 1
    }
  })

  const vehicle2 = await prisma.vehicle.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      cor: 'BRANCO',
      potencia: '77 cv',
      motor: '1.0',
      placa: 'ABC-3456',
      localizacao: 'São Paulo - SP',
      marca: 'VOLKSWAGEN',
      modelo: 'GOL',
      anoModelo: 2018,
      anoFabricacao: 2017,
      renavan: '12345678911',
      chassi: 'ABCDEFG1234567891',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Volkswagen_Gol_1.6_Power_2013_%2812489173025%29.jpg/300px-Volkswagen_Gol_1.6_Power_2013_%2812489173025%29.jpg',
      userId: 1
    }
  })

  const vehicle3 = await prisma.vehicle.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      cor: 'BRANCO',
      potencia: '77 cv',
      motor: '1.0',
      placa: 'ABC-2345',
      localizacao: 'São Paulo - SP',
      marca: 'FIAT',
      modelo: 'UNO WAY',
      anoModelo: 2018,
      anoFabricacao: 2017,
      renavan: '12345678912',
      chassi: 'ABCDEFG1234567892',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fiat_Uno_Way_2016_%2837571613002%29.jpg/300px-Fiat_Uno_Way_2016_%2837571613002%29.jpg',
      userId: 1
    }
  })

  const vehicle4 = await prisma.vehicle.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      cor: 'PRETO',
      potencia: '77 cv',
      motor: '1.0',
      placa: 'ABC-1234',
      localizacao: 'São Paulo - SP',
      marca: 'RENAULT',
      modelo: 'Clio',
      anoModelo: 2018,
      anoFabricacao: 2017,
      renavan: '12345678913',
      chassi: 'ABCDEFG1234567893',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMOXbRHoJSFow-lVv8ivwTY1wkjxgY9TJN1kRKoZjK1swJgKx62gdiWTTa2I4bFnjG9rQ&usqp=CAU',
      userId: 1
    }
  })

  console.log(vehicle1, vehicle2, vehicle3, vehicle4)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit()
  })
