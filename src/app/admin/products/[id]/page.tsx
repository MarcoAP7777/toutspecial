import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/components/admin/product-form';

export const metadata: Metadata = {
  title: 'Editar Produto | Painel Administrativo',
  description: 'Editar produto no Tout Spécial',
  robots: 'noindex, nofollow',
};

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Editar Produto
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
