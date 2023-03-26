import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const user = await prisma.user.upsert({
    where: { email: 'dheniarley@email.com' },
    update: {},
    create: {
      email: 'dheniarley@email.com',
      name: 'Dheniarley Cruz',
      cpf: '04223688146',
      password: '$2a$10$ELtbi2ZDbjw3UZIwXk9ny.W3DgF1u6NzxizoL.1q5l0YJwxmJ/w5.'
    }
  })

  console.log(user)
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
