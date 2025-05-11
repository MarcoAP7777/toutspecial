const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'marco@toutspecial.com.br'
  
  const existingAdmin = await prisma.users.findUnique({
    where: { email: adminEmail }
  })
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('@Cusor777', 10)
    
    await prisma.users.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Marco',
        role: 'ADMIN'
      }
    })
    console.log('✅ Usuário admin criado com sucesso')
  } else {
    // Atualiza a senha se o usuário já existe
    const hashedPassword = await bcrypt.hash('@Cusor777', 10)
    await prisma.users.update({
      where: { email: adminEmail },
      data: {
        password: hashedPassword,
        name: 'Marco'
      }
    })
    console.log('✅ Usuário admin atualizado com sucesso')
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar/atualizar usuário admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 