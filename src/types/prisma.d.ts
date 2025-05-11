import { PrismaClient } from '@prisma/client';

declare global {
  namespace PrismaClient {
    interface User {
      id: string;
      email: string;
      name: string;
      password: string;
      role: string;
      created_at: Date;
      updated_at: Date;
    }
  }
}
