import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations/product';

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      select: {
        product_id: true,
        name: true,
        price: true,
        stock: true,
        is_active: true,
        brand: {
          select: {
            name: true,
          },
        },
        product_variants: {
          select: {
            sku: true,
            stock: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: validatedData,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
