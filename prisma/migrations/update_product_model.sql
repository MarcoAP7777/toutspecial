-- Primeiro, vamos garantir que todos os produtos tenham slugs baseados no nome
UPDATE "toutspecial"."products"
SET "slug" = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE "slug" IS NULL;

-- Adicionar um sufixo numérico para slugs duplicados
WITH duplicates AS (
  SELECT "slug", COUNT(*) as count
  FROM "toutspecial"."products"
  GROUP BY "slug"
  HAVING COUNT(*) > 1
)
UPDATE "toutspecial"."products" p
SET "slug" = p."slug" || '-' || ROW_NUMBER() OVER (PARTITION BY p."slug" ORDER BY p."created_at")
FROM duplicates d
WHERE p."slug" = d."slug" AND ROW_NUMBER() OVER (PARTITION BY p."slug" ORDER BY p."created_at") > 1;

-- Definir preço como 0 onde for nulo
UPDATE "toutspecial"."products"
SET "price" = 0
WHERE "price" IS NULL;

-- Gerar SKUs únicos onde estiver faltando
UPDATE "toutspecial"."products"
SET "sku" = 'SKU-' || "product_id"
WHERE "sku" IS NULL;

-- Definir peso como 0 onde for nulo
UPDATE "toutspecial"."products"
SET "weight" = 0
WHERE "weight" IS NULL;

-- Definir estoque como 0 onde for nulo
UPDATE "toutspecial"."products"
SET "stock" = 0
WHERE "stock" IS NULL;

-- Definir is_active como true onde for nulo
UPDATE "toutspecial"."products"
SET "is_active" = true
WHERE "is_active" IS NULL;

-- Alterar as colunas para NOT NULL após preencher os dados
ALTER TABLE "toutspecial"."products"
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "sku" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "stock" SET NOT NULL,
ALTER COLUMN "is_active" SET NOT NULL;

-- Adicionar as constraints UNIQUE
ALTER TABLE "toutspecial"."products"
ADD CONSTRAINT "products_slug_key" UNIQUE ("slug"),
ADD CONSTRAINT "products_sku_key" UNIQUE ("sku"); 