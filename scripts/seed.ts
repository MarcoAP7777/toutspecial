import { seedAdminUser } from '@/lib/users'

async function main() {
  try {
    await seedAdminUser()
    console.log('✅ Dados iniciais criados com sucesso')
  } catch (error) {
    console.error('❌ Erro ao criar dados iniciais:', error)
    process.exit(1)
  }
}

main() 