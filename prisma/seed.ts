import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@toutspecial.com';

  const existingAdmin = await prisma.users.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash('admin123', 10);

    await prisma.users.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrador',
        role: 'ADMIN',
      },
    });
    console.log('✅ Usuário admin criado com sucesso');
  } else {
    console.log('ℹ️ Usuário admin já existe');
  }
}

main()
  .catch(e => {
    console.error('❌ Erro ao criar usuário admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
