import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { signJWT as signToken, setAuthCookie } from '@/lib/auth';
import { comparePasswords } from '@/lib/crypto';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Body recebido:', { email: body.email }); // Não logamos a senha por segurança
    
    const { email, password } = loginSchema.parse(body);
    console.log('Dados validados pelo Zod');

    const user = await prisma.users.findUnique({
      where: { 
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });
    console.log('Busca no banco:', user ? 'Usuário encontrado' : 'Usuário não encontrado');

    if (!user) {
      console.log('Usuário não encontrado');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isValidPassword = await comparePasswords(password, user.password);
    console.log('Validação de senha:', isValidPassword ? 'Senha válida' : 'Senha inválida');
    
    if (!isValidPassword) {
      console.log('Senha inválida');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    const token = await signToken(userWithoutPassword);
    await setAuthCookie(token);

    console.log('Login bem-sucedido para:', userWithoutPassword.email);
    return NextResponse.json({ 
      user: userWithoutPassword,
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    console.error('Login error:', error);
    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('Detalhes do erro:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados de login inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
} 