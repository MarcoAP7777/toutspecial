import { hash, compare } from 'bcryptjs';
import { prisma } from './prisma';
import { UserData } from './auth';

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'MANAGER';
}) {
  const hashedPassword = await hash(data.password, 10);

  const user = await prisma.users.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role || 'MANAGER',
    },
  });

  const { password: _, ...userData } = user;
  return userData;
}

export async function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export async function validateUser(email: string, password: string): Promise<UserData | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await compare(password, user.password);
  if (!isValid) return null;

  const { password: _, ...userData } = user;
  return userData;
}

// Função para criar o usuário admin inicial
export async function seedAdminUser() {
  const adminEmail = 'admin@toutspecial.com';
  const existingAdmin = await findUserByEmail(adminEmail);

  if (!existingAdmin) {
    await createUser({
      email: adminEmail,
      password: 'admin123', // Em produção, usar uma senha forte
      name: 'Administrador',
      role: 'ADMIN',
    });
    console.log('Usuário admin criado com sucesso');
  }
}
