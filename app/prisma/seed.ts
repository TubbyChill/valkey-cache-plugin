import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create superadmin user
  const hashedPassword = await bcrypt.hash('azpo', 10)
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superAdminOliv@tubbychill.com' },
    update: {},
    create: {
      email: 'superAdminOliv@tubbychill.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
      apiKeys: {
        create: [{
          key: 'sk_test_superadmin',
          isActive: true,
        }],
      },
    },
  })

  console.log({ superAdmin })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 