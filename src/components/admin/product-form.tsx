'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormData } from '@/lib/validations/product';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  initialData?: ProductFormData;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      isActive: true,
      images: [],
      seo: {
        keywords: [],
      },
    },
  });

  async function onSubmit(data: ProductFormData) {
    try {
      setIsSubmitting(true);
      const endpoint = initialData
        ? `/api/admin/products/${initialData.id}`
        : '/api/admin/products';

      const response = await fetch(endpoint, {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar produto');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            {...register('sku')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preço Comparativo</label>
          <input
            type="number"
            step="0.01"
            {...register('compareAtPrice', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.compareAtPrice && (
            <p className="mt-1 text-sm text-red-600">{errors.compareAtPrice.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            rows={4}
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input
            type="number"
            step="0.001"
            {...register('weight', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estoque</label>
          <input
            type="number"
            {...register('stock', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
        </div>

        <div className="col-span-2">
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                {...register('isActive')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">Produto Ativo</label>
              <p className="text-gray-500">Produtos inativos não aparecem na loja</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
