'use client';

import { useState } from 'react';
import { ProductVariantFormData } from '@/lib/validations/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VariantManagerProps {
  variants: ProductVariantFormData[];
  onChange: (variants: ProductVariantFormData[]) => void;
  colors: Array<{ id: string; name: string; hex_code: string }>;
  sizes: Array<{ id: string; name: string }>;
}

export const VariantManager = ({ variants, onChange, colors, sizes }: VariantManagerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const addVariant = () => {
    if (!selectedColor || !selectedSize) return;

    // Verificar se a combinação já existe
    const exists = variants.some(v => v.color_id === selectedColor && v.size_id === selectedSize);

    if (exists) {
      alert('Esta combinação de cor e tamanho já existe');
      return;
    }

    const newVariant: ProductVariantFormData = {
      sku: '', // Será gerado no backend
      color_id: selectedColor,
      size_id: selectedSize,
      price: 0,
      stock: 0,
      weight: 0,
    };

    onChange([...variants, newVariant]);
    setSelectedColor('');
    setSelectedSize('');
  };

  const updateVariant = (index: number, field: keyof ProductVariantFormData, value: any) => {
    const newVariants = [...variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value,
    };
    onChange(newVariants);
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Cor</label>
          <select
            value={selectedColor}
            onChange={e => setSelectedColor(e.target.value)}
            className="w-full rounded-md border border-gray-300"
          >
            <option value="">Selecione uma cor</option>
            {colors.map(color => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Tamanho</label>
          <select
            value={selectedSize}
            onChange={e => setSelectedSize(e.target.value)}
            className="w-full rounded-md border border-gray-300"
          >
            <option value="">Selecione um tamanho</option>
            {sizes.map(size => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={addVariant} disabled={!selectedColor || !selectedSize}>
          Adicionar Variação
        </Button>
      </div>

      <div className="grid gap-4">
        {variants.map((variant, index) => {
          const color = colors.find(c => c.id === variant.color_id);
          const size = sizes.find(s => s.id === variant.size_id);

          return (
            <Card key={`${variant.color_id}-${variant.size_id}`} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color?.hex_code }}
                  />
                  <span>{color?.name}</span>
                  <span className="mx-2">|</span>
                  <span>{size?.name}</span>
                </div>

                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={e => updateVariant(index, 'sku', e.target.value)}
                      className="w-full rounded-md border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Preço</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={e => updateVariant(index, 'price', Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Estoque</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={e => updateVariant(index, 'stock', Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Peso (g)</label>
                    <input
                      type="number"
                      value={variant.weight}
                      onChange={e => updateVariant(index, 'weight', Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300"
                      min="0"
                    />
                  </div>
                </div>

                <Button variant="destructive" size="sm" onClick={() => removeVariant(index)}>
                  Remover
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
