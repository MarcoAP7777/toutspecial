import { z } from 'zod';

// Schema para variação de produto
export const productVariantSchema = z.object({
  id: z.string().uuid().optional(),
  sku: z.string().min(3).max(50),
  ean: z.string().min(13).max(13).optional(),
  color_id: z.string().uuid(),
  size_id: z.string().uuid(),
  price: z.number().min(0),
  sale_price: z.number().min(0).optional(),
  stock: z.number().min(0),
  weight: z.number().min(0),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0)
  }).optional(),
});

// Schema para imagem de produto
export const productImageSchema = z.object({
  id: z.string().uuid().optional(),
  url: z.string().url(),
  alt: z.string().max(100),
  display_order: z.number().min(0),
});

// Schema principal do produto
export const productSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  short_description: z.string().max(160).optional(),
  brand_id: z.string().uuid(),
  is_active: z.boolean().default(true),
  
  // SEO
  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
  h1: z.string().max(100).optional(),
  
  // Relacionamentos
  categories: z.array(z.string().uuid()).min(1),
  tags: z.array(z.string().uuid()).optional(),
  related_products: z.array(z.string().uuid()).optional(),
  bundle_products: z.array(z.object({
    product_id: z.string().uuid(),
    display_order: z.number().min(0)
  })).optional(),
  
  // Variações e imagens
  variants: z.array(productVariantSchema).min(1),
  images: z.array(productImageSchema).min(1),
  
  // Campos adicionais de moda
  garment_type_id: z.string().uuid().optional(),
  occasions: z.array(z.string().uuid()).optional(),
  composition: z.string().optional(),
  care_instructions: z.string().optional(),
  
  // Campos de vitrine
  showcase_id: z.string().uuid().optional(),
  display_order: z.number().min(0).optional(),
  
  // Campos de auditoria
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductVariantFormData = z.infer<typeof productVariantSchema>;
export type ProductImageFormData = z.infer<typeof productImageSchema>; 