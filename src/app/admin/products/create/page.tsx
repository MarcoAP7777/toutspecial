import { redirect } from 'next/navigation'
import { ProductForm } from '@/components/admin/products/ProductForm'
import { prisma } from '@/lib/prisma'
import { ProductFormData } from '@/lib/validations/product'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

export const metadata = {
  title: 'Criar Produto - Tout Spécial Admin',
  description: 'Criar novo produto no catálogo da Tout Spécial'
}

async function createProduct(data: ProductFormData) {
  'use server'
  
  try {
    // Preparar atributos do produto
    const productAttributes = []
    if (data.composition) {
      productAttributes.push({
        id: randomUUID(),
        name: 'composition',
        value: data.composition
      })
    }
    if (data.care_instructions) {
      productAttributes.push({
        id: randomUUID(),
        name: 'care_instructions',
        value: data.care_instructions
      })
    }

    const baseVariant = data.variants[0]
    await prisma.products.create({
      data: {
        product_id: randomUUID(),
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: new Decimal(baseVariant.price),
        sku: baseVariant.sku,
        barcode: baseVariant.ean || null,
        weight: new Decimal(baseVariant.weight),
        stock: data.variants.reduce((total, variant) => total + variant.stock, 0),
        is_active: data.is_active,
        brand_id: data.brand_id,
        seo_title: data.seo_title || null,
        seo_description: data.seo_description || null,
        seo_keywords: [],
        
        // Relacionamentos
        product_categories: {
          create: data.categories.map(categoryId => ({
            category_id: categoryId
          }))
        },
        
        // Imagens
        product_images: {
          create: data.images.map((image, index) => ({
            image_id: randomUUID(),
            url: image.url,
            alt: image.alt,
            display_order: index
          }))
        },
        
        // Variações
        product_variants: {
          create: data.variants.map(variant => ({
            id: randomUUID(),
            sku: variant.sku,
            ean: variant.ean || null,
            color_id: variant.color_id,
            size_id: variant.size_id,
            price: new Decimal(variant.price),
            promotional_price: variant.sale_price ? new Decimal(variant.sale_price) : null,
            stock: variant.stock,
            is_default: variant === baseVariant,
            variant_images: variant.dimensions ? JSON.stringify(variant.dimensions) : undefined
          }))
        },
        
        // Atributos adicionais
        product_attributes: productAttributes.length > 0 ? {
          create: productAttributes
        } : undefined
      }
    })

    redirect('/admin/products')
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return { success: false as const, error: 'Erro ao criar produto' }
  }
}

export default async function CreateProductPage() {
  // Buscar dados necessários para o formulário
  const [brands, categories, colors, sizes, garmentTypes, occasions] = await Promise.all([
    prisma.brands.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        name: {
          not: null
        }
      },
      orderBy: {
        name: 'asc'
      }
    }).then(brands => brands.map(brand => ({
      id: brand.id,
      name: brand.name as string // Garantir que name não é null devido ao where
    }))),
    prisma.categories.findMany({
      select: {
        category_id: true,
        name: true
      },
      where: {
        name: {
          not: null
        }
      },
      orderBy: {
        name: 'asc'
      }
    }).then(categories => categories.map(category => ({
      category_id: category.category_id,
      name: category.name as string // Garantir que name não é null devido ao where
    }))),
    prisma.colors.findMany({
      select: {
        color_id: true,
        name: true,
        hex_code: true
      },
      orderBy: {
        name: 'asc'
      }
    }).then(colors => colors.map(c => ({
      id: c.color_id,
      name: c.name,
      hex_code: c.hex_code
    }))),
    prisma.sizes.findMany({
      select: {
        size_id: true,
        label: true
      },
      orderBy: {
        ordering: 'asc'
      }
    }).then(sizes => sizes.map(s => ({
      id: s.size_id,
      name: s.label
    }))),
    prisma.garment_types.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    }),
    prisma.occasions.findMany({
      select: {
        occasions_id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })
  ])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Criar Novo Produto</h1>
      
      <ProductForm
        onSubmit={createProduct}
        brands={brands}
        categories={categories}
        colors={colors}
        sizes={sizes}
        garmentTypes={garmentTypes}
        occasions={occasions}
      />
    </div>
  )
} 