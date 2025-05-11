import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormData, productSchema } from '@/lib/validations/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUploader } from './ImageUploader';
import { VariantManager } from './VariantManager';
import { Editor } from '@/components/ui/editor'; // Componente de editor WYSIWYG a ser implementado

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<{ success: boolean; product?: any; error?: string }>;
  brands: Array<{ id: string; name: string }>;
  categories: Array<{ category_id: string; name: string }>;
  colors: Array<{ id: string; name: string; hex_code: string }>;
  sizes: Array<{ id: string; name: string }>;
  garmentTypes: Array<{ id: string; name: string }>;
  occasions: Array<{ occasions_id: string; name: string }>;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  brands,
  categories,
  colors,
  sizes,
  garmentTypes,
  occasions,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      is_active: true,
      ...initialData,
    },
  });

  const images = watch('images') || [];
  const variants = watch('variants') || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Informações Básicas */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Produto</label>
            <input
              type="text"
              {...register('name')}
              className="w-full rounded-md border border-gray-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              {...register('slug')}
              className="w-full rounded-md border border-gray-300"
            />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <select {...register('brand_id')} className="w-full rounded-md border border-gray-300">
              <option value="">Selecione uma marca</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand_id && (
              <p className="text-red-500 text-sm mt-1">{errors.brand_id.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Peça</label>
            <select
              {...register('garment_type_id')}
              className="w-full rounded-md border border-gray-300"
            >
              <option value="">Selecione um tipo</option>
              {garmentTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Descrição Curta</label>
          <textarea
            {...register('short_description')}
            className="w-full rounded-md border border-gray-300"
            rows={2}
          />
          {errors.short_description && (
            <p className="text-red-500 text-sm mt-1">{errors.short_description.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Descrição Completa</label>
          <Editor value={watch('description')} onChange={value => setValue('description', value)} />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>
      </Card>

      {/* SEO */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">H1</label>
            <input
              type="text"
              {...register('h1')}
              className="w-full rounded-md border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <input
              type="text"
              {...register('seo_title')}
              className="w-full rounded-md border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <textarea
              {...register('seo_description')}
              className="w-full rounded-md border border-gray-300"
              rows={2}
            />
          </div>
        </div>
      </Card>

      {/* Categorias e Ocasiões */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Categorias e Ocasiões</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categorias</label>
            <select
              multiple
              {...register('categories')}
              className="w-full rounded-md border border-gray-300 h-32"
            >
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categories && (
              <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ocasiões de Uso</label>
            <select
              multiple
              {...register('occasions')}
              className="w-full rounded-md border border-gray-300 h-32"
            >
              {occasions.map(occasion => (
                <option key={occasion.occasions_id} value={occasion.occasions_id}>
                  {occasion.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Imagens */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Imagens</h2>
        <ImageUploader images={images} onChange={newImages => setValue('images', newImages)} />
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
      </Card>

      {/* Variações */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Variações</h2>
        <VariantManager
          variants={variants}
          onChange={newVariants => setValue('variants', newVariants)}
          colors={colors}
          sizes={sizes}
        />
        {errors.variants && <p className="text-red-500 text-sm mt-1">{errors.variants.message}</p>}
      </Card>

      {/* Informações Adicionais */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Composição</label>
            <textarea
              {...register('composition')}
              className="w-full rounded-md border border-gray-300"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instruções de Cuidado</label>
            <textarea
              {...register('care_instructions')}
              className="w-full rounded-md border border-gray-300"
              rows={3}
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" {...register('is_active')} className="rounded border-gray-300" />
            <label className="ml-2 text-sm">Produto Ativo</label>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
        </Button>
      </div>
    </form>
  );
};
