📐 Guia de Atributos Técnicos para Moda Feminina
Este guia define os atributos técnicos padronizados usados no cadastro de produtos de moda feminina no e-commerce Tout Spécial. Os dados aqui documentados são fundamentais para SEO, filtros, organização do catálogo e estruturação via Schema Markup.

🧷 Tipos de Peças (garmentType)
typescript
Copiar
Editar
export enum GarmentType {
  DRESS = 'vestido',
  BLOUSE = 'blusa',
  SKIRT = 'saia',
  PANTS = 'calça',
  JACKET = 'jaqueta',
  SWIMWEAR = 'maiô/biquíni',
  UNDERWEAR = 'lingerie'
}
Esses valores são utilizados em filtros, estrutura de URL, agrupamento por categorias e marcação de dados estruturados (Schema Markup).

✅ Recomendação Google: para productType use descrições detalhadas e específicas sempre que possível. Exemplo: vestido midi de algodão.

🎨 Paleta de Cores Padronizadas
Nome Técnico	Código HEX	Exemplo Visual
Vermelho Cetim	#FF355E	
Azul Marinho	#1D334A	

⚠️ A cor principal cadastrada no produto deve seguir essa nomenclatura padronizada. Use nomes reconhecíveis (ex: “Azul Marinho”) para SEO e Schema.

✅ Recomendação Google: Evite usar cores genéricas como "colorido" ou "variado". Use termos objetivos e específicos.

📏 Sistema de Medidas
Tabela de Tamanhos
PP | P | M | G | GG
4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22
36 | 38 | 40 | 42 | 44

✅ Recomendação Google: Utilize padrões locais e internacionais se possível (ex: BR, EU, US) com conversões nos detalhes do produto para atender rich snippets e acessibilidade.

🧵 Composição Têxtil (fabricComposition)
Formato padrão:

shell
Copiar
Editar
95% algodão, 5% elastano
70% seda, 30% linho
🚨 Evitar abreviações ou uso de “e” (ex: “algodão e elastano”). Sempre usar vírgula e percentual por item.

✅ Recomendação Google: esse dado deve ser exibido visualmente e também inserido como material em Schema.org.

🏷️ Ocasiões de Uso (occasion)
typescript
Copiar
Editar
const occasions = [
  'trabalho', 
  'festa',
  'casual',
  'praia',
  'esporte'
];
Esses valores podem ser usados como filtros na vitrine e também integrados ao Schema Markup como parte do atributo suitableFor.

✅ Recomendação Google: contextualizar a ocasião no nome ou descrição melhora a correspondência semântica nos resultados (ex: “Vestido Casual Azul para Trabalho”).

📸 Imagens
Mínimo recomendado: 1024px no lado maior

Fundo branco ou neutro preferencial

Sem marcas d’água

Mostre o produto em uso (modelo), variações de cor e detalhes

✅ Recomendação Google: imagens de alta qualidade com fundo limpo melhoram a visibilidade no Google Imagens e Shopping.

🧩 Integração com Schema Markup
Todos os atributos listados devem ser compatíveis com a estrutura do Product ou WearableSizeSystem descrita em schema-strategy.md.

Atributo	Campo Schema.org
garmentType	productType
fabricComposition	material
occasion	suitableFor
color	color
size	size
brand	brand
image	image
gtin / ean	gtin13
sku	sku
price	offers.price
availability	offers.availability
condition	offers.itemCondition

💡 Dica Avançada: utilizar isVariantOf e hasVariant em produtos com variações melhora a estrutura do catálogo no Google.

🧪 Checklist para Rich Snippets de Produtos
Item	Obrigatório p/ Google	Campo
Nome do Produto	✅	name
Descrição	✅	description
Preço	✅	offers.price
Disponibilidade	✅	offers.availability
Condição (novo/usado)	✅	offers.itemCondition
Imagem Principal	✅	image
Marca	✅	brand
GTIN (EAN)	✅	gtin13
SKU	✅	sku
Avaliação Média	Opcional	aggregateRating
Número de Avaliações	Opcional	reviewCount