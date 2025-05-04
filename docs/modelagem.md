# Modelagem de Dados

Este documento descreve a estrutura do banco de dados do e-commerce Tout Spécial.

## Visão Geral

O banco de dados utiliza PostgreSQL com o schema `toutspecial`. A modelagem foi projetada para suportar todas as funcionalidades do e-commerce, incluindo:

- Cadastro de produtos com variações
- Gestão de estoque
- Processamento de pedidos
- Gestão de clientes
- Cupons de desconto
- SEO e metadados

## Estrutura Principal

### Produtos e Categorias

- `products`: Tabela principal de produtos
- `product_variants`: Variações de produtos (cores, tamanhos)
- `categories`: Categorias de produtos
- `product_categories`: Relacionamento N:N entre produtos e categorias
- `brands`: Marcas de produtos

### Clientes e Pedidos

- `customers`: Cadastro de clientes
- `address`: Endereços dos clientes
- `orders`: Pedidos
- `order_items`: Itens dos pedidos
- `order_tracking`: Rastreamento de pedidos

### Marketing e SEO

- `coupon`: Cupons de desconto
- `showcases`: Vitrines de produtos
- `product_reviews`: Avaliações de produtos
- `redirects`: Redirecionamentos de URLs

## Tipos de Produtos e Vendas

### Tipos de Produto

- `physical`: Produto físico
- `bundle`: Kit ou conjunto de produtos
- `service`: Serviço

### Status de Estoque

- `in_stock`: Em estoque
- `out_of_stock`: Fora de estoque
- `pre_order`: Pré-venda
- `discontinued`: Descontinuado

### Tipos de Venda

- `unitaria`: Venda unitária (padrão)
- `bundle`: Venda em conjunto
- `subscription`: Assinatura

## Preços e Validações

### Campos de Preço

- `price`: Preço de venda
- `buy_price`: Preço de custo
- `promotional_price`: Preço promocional

### Regras de Validação

- O preço de venda (`price`) deve ser maior que o preço de custo (`buy_price`)
- O preço promocional (`promotional_price`) deve ser:
  - Maior que o preço de custo (`buy_price`)
  - Menor que o preço de venda (`price`)

## Cupons de Desconto

### Tipos de Cupom

- `percentage`: Desconto em porcentagem
- `fixed`: Desconto em valor fixo

### Aplicação de Cupons

- `is_global`: Indica se o cupom é válido para todos os produtos
- `coupon_products`: Produtos específicos que aceitam o cupom
- `coupon_categories`: Categorias específicas que aceitam o cupom

## Índices e Otimizações

### Índices Principais

- `idx_products_brand_id`: Otimiza buscas por marca
- `idx_products_is_active`: Otimiza filtros de produtos ativos
- `idx_products_sku`: Otimiza buscas por SKU
- `idx_address_customer_id`: Otimiza consultas de endereços por cliente
- `idx_orders_customer_id`: Otimiza consultas de pedidos por cliente

### Índices Compostos

- `idx_products_created_active`: Otimiza listagem de produtos ativos por data
- `idx_products_price_active`: Otimiza filtros de preço para produtos ativos
- `idx_customers_created_consent`: Otimiza relatórios de consentimento LGPD
- `idx_orders_created_status`: Otimiza relatórios de pedidos por status
- `idx_orders_customer_status`: Otimiza histórico de pedidos do cliente
- `idx_products_type_active`: Otimiza filtros por tipo de produto
- `idx_products_stock_active`: Otimiza filtros por status de estoque

## Validações e Constraints

### Campos de Texto

- Nomes: `@db.VarChar(100)`
- Emails: `@db.VarChar(255)`
- URLs: `@db.VarChar(255)`
- Descrições curtas: `@db.VarChar(160)`
- Descrições longas: `@db.Text`

### Campos Numéricos

- Preços: `@db.Decimal(10, 2)`
- Peso: `@db.Decimal(10, 3)`
- Dimensões: `@db.Decimal(10, 2)`

## Relacionamentos

### Deleção em Cascata

- Endereços são deletados quando o cliente é removido
- Itens do pedido são deletados quando o pedido é removido
- Categorias de cupom são deletadas quando o cupom é removido
- Atributos de produto são deletados quando o produto é removido
- Produtos em conjunto são deletados quando o produto principal é removido

### Restrições de Atualização

- Produtos não podem ser deletados se tiverem pedidos
- Clientes não podem ser deletados se tiverem pedidos
- Marcas não podem ser deletadas se tiverem produtos

## Auditoria

### Campos de Auditoria

- `created_at`: Data de criação
- `updated_at`: Data de atualização
- `created_by`: ID do usuário que criou
- `updated_by`: ID do usuário que atualizou

### Tabelas com Auditoria

- `products`
- `customers`
- `orders`
- `categories`
- `brands`

## Exemplos de Queries

### Produtos

```sql
-- Buscar produtos ativos com preço entre X e Y
SELECT * FROM toutspecial.products 
WHERE is_active = true 
AND price BETWEEN 100 AND 200
ORDER BY created_at DESC;

-- Buscar produtos por marca com estoque
SELECT p.* FROM toutspecial.products p
JOIN toutspecial.product_variants pv ON p.product_id = pv.product_id
WHERE p.brand_id = 'uuid-da-marca'
AND pv.stock > 0
AND p.is_active = true;

-- Buscar produtos em promoção
SELECT * FROM toutspecial.products
WHERE promotional_price IS NOT NULL
AND promotional_price < price
AND is_active = true;
```

### Pedidos

```sql
-- Buscar pedidos recentes de um cliente
SELECT * FROM toutspecial.orders
WHERE customer_id = 'uuid-do-cliente'
AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Relatório de pedidos por status
SELECT status, COUNT(*) as total
FROM toutspecial.orders
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY status;
```

### Clientes

```sql
-- Buscar clientes com consentimento LGPD
SELECT * FROM toutspecial.customers
WHERE lgpd_consent = true
AND created_at >= NOW() - INTERVAL '1 year';

-- Relatório de clientes por gênero
SELECT gender, COUNT(*) as total
FROM toutspecial.customers
GROUP BY gender;
```

### Cupons

```sql
-- Buscar cupons ativos para um produto
SELECT c.* FROM toutspecial.coupon c
LEFT JOIN toutspecial.coupon_products cp ON c.coupon_id = cp.coupon_id
LEFT JOIN toutspecial.coupon_categories cc ON c.coupon_id = cc.coupon_id
LEFT JOIN toutspecial.product_categories pc ON cc.category_id = pc.category_id
WHERE c.is_active = true
AND (c.is_global = true 
     OR cp.product_id = 'uuid-do-produto'
     OR pc.product_id = 'uuid-do-produto')
AND (c.start_at IS NULL OR c.start_at <= NOW())
AND (c.end_at IS NULL OR c.end_at >= NOW());
```

## Cache e Performance

- `product_cache`: Cache de dados de produtos para otimização
- Índices compostos para consultas frequentes
- Timestamps para auditoria (`created_at`, `updated_at`)

## Próximos Passos

1. Implementar validações de preço na camada de aplicação
2. Adicionar triggers para validações complexas no banco de dados
3. Implementar particionamento de tabelas grandes
4. Otimizar queries complexas 