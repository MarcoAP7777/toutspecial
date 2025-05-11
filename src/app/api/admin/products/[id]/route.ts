import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations/product';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);

    const product = await prisma.product.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
} 