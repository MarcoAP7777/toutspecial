-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "toutspecial";

-- CreateEnum
CREATE TYPE "toutspecial"."discount_type_enum" AS ENUM ('percentage', 'fixed');

-- CreateEnum
CREATE TYPE "toutspecial"."gender_enum" AS ENUM ('female', 'male', 'other');

-- CreateEnum
CREATE TYPE "toutspecial"."order_status" AS ENUM ('pending', 'paid', 'shipped', 'canceled', 'delivered');

-- CreateEnum
CREATE TYPE "toutspecial"."review_status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "toutspecial"."product_type" AS ENUM ('physical', 'bundle', 'service');

-- CreateEnum
CREATE TYPE "toutspecial"."stock_status" AS ENUM ('in_stock', 'out_of_stock', 'pre_order', 'discontinued');

-- CreateEnum
CREATE TYPE "toutspecial"."sale_type" AS ENUM ('unitaria', 'bundle', 'subscription');

-- CreateTable
CREATE TABLE "toutspecial"."address" (
    "address_id" UUID NOT NULL,
    "customer_id" UUID,
    "zipcode" VARCHAR(8) NOT NULL,
    "street" VARCHAR(200) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "complement" VARCHAR(100),
    "neighborhood" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(2) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."brands" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100),
    "slug" VARCHAR(100),
    "description" TEXT,
    "seo_title" VARCHAR(60),
    "seo_description" VARCHAR(160),
    "logo_url" VARCHAR(255),

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."categories" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR(100),
    "slug" VARCHAR(100),
    "parent_id" UUID,
    "description" TEXT,
    "thumbnail" VARCHAR(255),
    "menu_order" INTEGER,
    "seo_title" VARCHAR(60),
    "seo_description" VARCHAR(160),
    "is_active" BOOLEAN DEFAULT true,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."colors" (
    "color_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "hex_code" CHAR(7) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("color_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."coupon" (
    "coupon_id" TEXT NOT NULL,
    "discount_type" "toutspecial"."discount_type_enum" NOT NULL,
    "discount_value" DECIMAL(10,2) NOT NULL,
    "free_shipping" BOOLEAN DEFAULT false,
    "start_at" TIMESTAMP(6),
    "end_at" TIMESTAMP(6),
    "is_active" BOOLEAN DEFAULT true,
    "is_global" BOOLEAN DEFAULT false,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("coupon_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."coupon_categories" (
    "coupon_id" TEXT NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "coupon_categories_pkey" PRIMARY KEY ("coupon_id","category_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."coupon_products" (
    "coupon_id" TEXT NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "coupon_products_pkey" PRIMARY KEY ("coupon_id","product_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."customers" (
    "customer_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "document" BIGINT,
    "password_hash" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "birth_date" DATE,
    "gender" "toutspecial"."gender_enum",
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "lgpd_consent" BOOLEAN DEFAULT false,
    "lgpd_consent_date" TIMESTAMP(6),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."garment_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "garment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."login_attempts" (
    "ip_address" TEXT NOT NULL,
    "attempts" INTEGER,
    "blocked_until" TIMESTAMP(6),

    CONSTRAINT "login_attempts_pkey" PRIMARY KEY ("ip_address")
);

-- CreateTable
CREATE TABLE "toutspecial"."occasions" (
    "occasions_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "occasions_pkey" PRIMARY KEY ("occasions_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID,
    "product_id" UUID,
    "variant_id" UUID,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2),
    "discount_amount" DECIMAL(10,2),
    "coupon_id" TEXT,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."order_tracking" (
    "id" UUID NOT NULL,
    "order_id" UUID,
    "status" TEXT,
    "description" TEXT,
    "location" TEXT,
    "happened_at" TIMESTAMP(6),
    "metadata" JSONB,

    CONSTRAINT "order_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."orders" (
    "order_id" UUID NOT NULL,
    "customer_id" UUID,
    "status" "toutspecial"."order_status" NOT NULL,
    "subtotal" DECIMAL(10,2),
    "shipping_cost" DECIMAL(10,2),
    "discount" DECIMAL(10,2),
    "total" DECIMAL(10,2),
    "shipping_method" TEXT,
    "payment_method" TEXT,
    "tracking_code" TEXT,
    "estimated_delivery" DATE,
    "shipping_estimate" TEXT,
    "shipping_data" JSONB,
    "shipping_carrier_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" UUID,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."password_reset_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "token_hash" TEXT,
    "expires_at" TIMESTAMP(6),
    "used" BOOLEAN,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_cache" (
    "product_id" UUID NOT NULL,
    "cached_data" JSONB,
    "expires_at" TIMESTAMP(6),

    CONSTRAINT "product_cache_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_categories" (
    "product_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("product_id","category_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_images" (
    "image_id" UUID NOT NULL,
    "product_id" UUID,
    "url" TEXT,
    "alt_text" TEXT,
    "display_order" INTEGER,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_reviews" (
    "review_id" UUID NOT NULL,
    "customer_id" UUID,
    "product_id" UUID,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "reply" TEXT,
    "is_highlighted" BOOLEAN DEFAULT false,
    "status" "toutspecial"."review_status" DEFAULT 'pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_agent" TEXT,

    CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_tags" (
    "product_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "product_tags_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_variants" (
    "id" UUID NOT NULL,
    "product_id" UUID,
    "sku" TEXT,
    "ean" TEXT,
    "size_id" UUID,
    "color_id" UUID,
    "stock" INTEGER,
    "price" DECIMAL,
    "buy_price" DECIMAL,
    "promotional_price" DECIMAL,
    "variant_images" JSON,
    "is_default" BOOLEAN,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."products" (
    "product_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "compare_at_price" DECIMAL(10,2),
    "sku" VARCHAR(100) NOT NULL,
    "barcode" VARCHAR(100),
    "weight" DECIMAL(10,3) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "brand_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seo_title" VARCHAR(60),
    "seo_description" VARCHAR(160),
    "seo_keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_attributes" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_bundles" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "bundled_product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DECIMAL(5,2),

    CONSTRAINT "product_bundles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."product_downloads" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "file_size" INTEGER,
    "file_type" VARCHAR(50),

    CONSTRAINT "product_downloads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."redirects" (
    "redirect_id" UUID NOT NULL,
    "old_path" TEXT NOT NULL,
    "new_path" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "redirects_pkey" PRIMARY KEY ("redirect_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."shipping_carriers" (
    "id" UUID NOT NULL,
    "carrier_id" TEXT,
    "name" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "delivery_time" INTEGER,
    "fee" DECIMAL(10,2),

    CONSTRAINT "shipping_carriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."shipping_settings" (
    "id" UUID NOT NULL,
    "free_shipping_sp" DECIMAL(10,2),
    "free_shipping_others" DECIMAL(10,2),
    "extra_days" INTEGER,
    "safety_margin" DECIMAL(5,2),
    "is_active" BOOLEAN DEFAULT true,
    "api_key" TEXT,
    "sandbox" BOOLEAN DEFAULT false,
    "default_carrier" TEXT,

    CONSTRAINT "shipping_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toutspecial"."showcase_products" (
    "showcase_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "display_order" INTEGER,

    CONSTRAINT "showcase_products_pkey" PRIMARY KEY ("showcase_id","product_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."showcases" (
    "showcase_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "limite" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "showcases_pkey" PRIMARY KEY ("showcase_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."sizes" (
    "size_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" VARCHAR(20) NOT NULL,
    "numeric_value" INTEGER,
    "size_system" VARCHAR(10),
    "ordering" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("size_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."store_reviews" (
    "review_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "toutspecial"."tags" (
    "tag_id" UUID NOT NULL,
    "name" TEXT,
    "showcase_id" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateIndex
CREATE INDEX "idx_address_customer_id" ON "toutspecial"."address"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "toutspecial"."brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "toutspecial"."categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "colors_name_key" ON "toutspecial"."colors"("name");

-- CreateIndex
CREATE INDEX "idx_colors_hex_code" ON "toutspecial"."colors"("hex_code");

-- CreateIndex
CREATE INDEX "idx_coupon_categories_category_id" ON "toutspecial"."coupon_categories"("category_id");

-- CreateIndex
CREATE INDEX "idx_coupon_products_product_id" ON "toutspecial"."coupon_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "toutspecial"."customers"("email");

-- CreateIndex
CREATE INDEX "idx_customers_email" ON "toutspecial"."customers"("email");

-- CreateIndex
CREATE INDEX "idx_customers_document" ON "toutspecial"."customers"("document");

-- CreateIndex
CREATE INDEX "idx_customers_created_consent" ON "toutspecial"."customers"("created_at", "lgpd_consent");

-- CreateIndex
CREATE UNIQUE INDEX "garment_types_name_key" ON "toutspecial"."garment_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "idx_occasions_name" ON "toutspecial"."occasions"("name");

-- CreateIndex
CREATE INDEX "idx_order_items_order_id" ON "toutspecial"."order_items"("order_id");

-- CreateIndex
CREATE INDEX "idx_order_items_product_id" ON "toutspecial"."order_items"("product_id");

-- CreateIndex
CREATE INDEX "idx_order_items_variant_id" ON "toutspecial"."order_items"("variant_id");

-- CreateIndex
CREATE INDEX "idx_order_tracking_order_id" ON "toutspecial"."order_tracking"("order_id");

-- CreateIndex
CREATE INDEX "idx_order_tracking_status" ON "toutspecial"."order_tracking"("status");

-- CreateIndex
CREATE INDEX "idx_orders_created_at" ON "toutspecial"."orders"("created_at");

-- CreateIndex
CREATE INDEX "idx_orders_customer_id" ON "toutspecial"."orders"("customer_id");

-- CreateIndex
CREATE INDEX "idx_orders_status" ON "toutspecial"."orders"("status");

-- CreateIndex
CREATE INDEX "idx_orders_created_status" ON "toutspecial"."orders"("created_at", "status");

-- CreateIndex
CREATE INDEX "idx_orders_customer_status" ON "toutspecial"."orders"("customer_id", "status");

-- CreateIndex
CREATE INDEX "idx_product_reviews_product_id" ON "toutspecial"."product_reviews"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_customer_product_review" ON "toutspecial"."product_reviews"("customer_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_sku_key" ON "toutspecial"."product_variants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_ean_key" ON "toutspecial"."product_variants"("ean");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "toutspecial"."products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "toutspecial"."products"("sku");

-- CreateIndex
CREATE INDEX "idx_products_brand_id" ON "toutspecial"."products"("brand_id");

-- CreateIndex
CREATE INDEX "idx_products_is_active" ON "toutspecial"."products"("is_active");

-- CreateIndex
CREATE INDEX "idx_products_created_at" ON "toutspecial"."products"("created_at");

-- CreateIndex
CREATE INDEX "idx_products_updated_at" ON "toutspecial"."products"("updated_at");

-- CreateIndex
CREATE INDEX "idx_products_sku" ON "toutspecial"."products"("sku");

-- CreateIndex
CREATE INDEX "idx_product_attributes_product_id" ON "toutspecial"."product_attributes"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_bundles_product_id" ON "toutspecial"."product_bundles"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_bundles_bundled_id" ON "toutspecial"."product_bundles"("bundled_product_id");

-- CreateIndex
CREATE INDEX "idx_product_downloads_product_id" ON "toutspecial"."product_downloads"("product_id");

-- CreateIndex
CREATE INDEX "idx_redirects_old_path" ON "toutspecial"."redirects"("old_path");

-- CreateIndex
CREATE INDEX "idx_showcase_products_product_id" ON "toutspecial"."showcase_products"("product_id");

-- CreateIndex
CREATE INDEX "idx_sizes_ordering" ON "toutspecial"."sizes"("ordering");

-- CreateIndex
CREATE UNIQUE INDEX "idx_sizes_label_system" ON "toutspecial"."sizes"("label", "size_system");

-- CreateIndex
CREATE INDEX "idx_store_reviews_rating" ON "toutspecial"."store_reviews"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "toutspecial"."tags"("name");

-- AddForeignKey
ALTER TABLE "toutspecial"."address" ADD CONSTRAINT "address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "toutspecial"."customers"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."coupon_categories" ADD CONSTRAINT "coupon_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "toutspecial"."categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."coupon_categories" ADD CONSTRAINT "coupon_categories_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "toutspecial"."coupon"("coupon_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."coupon_products" ADD CONSTRAINT "coupon_products_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "toutspecial"."coupon"("coupon_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."coupon_products" ADD CONSTRAINT "coupon_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."order_items" ADD CONSTRAINT "order_items_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "toutspecial"."coupon"("coupon_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "toutspecial"."orders"("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."order_items" ADD CONSTRAINT "order_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "toutspecial"."product_variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."order_tracking" ADD CONSTRAINT "order_tracking_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "toutspecial"."orders"("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "toutspecial"."customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."orders" ADD CONSTRAINT "orders_shipping_carrier_id_fkey" FOREIGN KEY ("shipping_carrier_id") REFERENCES "toutspecial"."shipping_carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_cache" ADD CONSTRAINT "product_cache_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "toutspecial"."categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_reviews" ADD CONSTRAINT "product_reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "toutspecial"."customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_tags" ADD CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_tags" ADD CONSTRAINT "product_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "toutspecial"."tags"("tag_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "toutspecial"."brands"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_attributes" ADD CONSTRAINT "product_attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_bundles" ADD CONSTRAINT "product_bundles_bundled_product_id_fkey" FOREIGN KEY ("bundled_product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_bundles" ADD CONSTRAINT "product_bundles_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."product_downloads" ADD CONSTRAINT "product_downloads_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."showcase_products" ADD CONSTRAINT "showcase_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "toutspecial"."products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toutspecial"."showcase_products" ADD CONSTRAINT "showcase_products_showcase_id_fkey" FOREIGN KEY ("showcase_id") REFERENCES "toutspecial"."showcases"("showcase_id") ON DELETE CASCADE ON UPDATE NO ACTION;

