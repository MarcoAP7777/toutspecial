import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signJWT as signToken, setAuthCookie, MOCK_USERS } from '@/lib/auth';

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

    // Usando mock temporariamente
    const user = MOCK_USERS.find(u => u.email === email);
    console.log('Busca no mock:', user ? 'Usuário encontrado' : 'Usuário não encontrado');

    if (!user) {
      console.log('Usuário não encontrado');
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    // Para desenvolvimento, comparação direta
    const isValidPassword = user.password === password;
    console.log('Validação de senha:', isValidPassword ? 'Senha válida' : 'Senha inválida');

    if (!isValidPassword) {
      console.log('Senha inválida');
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    const token = await signToken(userWithoutPassword);
    await setAuthCookie(token);

    console.log('Login bem-sucedido para:', userWithoutPassword.email);
    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Login realizado com sucesso',
    });
  } catch (error) {
    console.error('Login error:', error);
    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('Detalhes do erro:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados de login inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Erro ao processar login' }, { status: 500 });
  }
}
