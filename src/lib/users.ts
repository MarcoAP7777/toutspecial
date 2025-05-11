import { UserData, MOCK_USERS } from './auth';

// Usando mock temporariamente
export async function findUserByEmail(email: string) {
  return MOCK_USERS.find(user => user.email === email);
}

export async function validateUser(email: string, password: string): Promise<UserData | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  // Para desenvolvimento, comparação direta
  if (user.password !== password) return null;

  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return userData;
}

// Outras funções comentadas temporariamente
/*
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

  const { password, ...userData } = user;
  return userData;
}

export async function seedAdminUser() {
  const adminEmail = 'admin@toutspecial.com';
  const existingAdmin = await findUserByEmail(adminEmail);

  if (!existingAdmin) {
    await createUser({
      email: adminEmail,
      password: 'admin123',
      name: 'Administrador',
      role: 'ADMIN',
    });
    console.log('Usuário admin criado com sucesso');
  }
}

export async function updateUser(data: any) {
  return await prisma.users.update({
    where: { id: data.id },
    data,
  });
}
*/
