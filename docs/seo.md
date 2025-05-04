# SEO

## Estratégia Geral
O projeto tem foco avançado em SEO técnico e on-page, visando performance orgânica sólida para e-commerce de moda. A estrutura foi planejada para ser escalável, rastreável por mecanismos de busca e compatível com as melhores práticas de Core Web Vitals e schema markup.

## Técnicas de SEO Implementadas

### Estrutura de URLs
- URLs limpas e sem extensões: `/vestidos-infantis`, `/produto/vestido-vermelho-infantil`.
- Utilização de hash fragmentos para rolagem infinita sem recarregamento da página (ex: `/categoria/vestidos-infantis#p3`).
- URLs de facetas (filtros aplicados) utilizam `<link rel="canonical">` apontando para a versão da categoria raiz, prevenindo indexação duplicada.

### HTML Semântico e Headings
- Uso de `H1` exclusivo para crawlers, parametrizado no SSR.
- `H2` extraído dos subtítulos das descrições (categorias e produtos).
- `H3` usado para:
  - Listagens de produtos em categorias.
  - Produtos relacionados nas páginas de produto.

### Imagens e Alt-text
- Cada imagem deve conter atributo `alt` configurável no painel.
- Caso não informado, o `alt` será preenchido automaticamente com o meta title do produto.
- Compatível com leitores de tela e boas práticas de acessibilidade e SEO.
- As imagens dos produtos são incorporadas automaticamente ao `schema.org/Product` como URLs otimizadas, aumentando a chance de exibição nos rich results.

### Metadados Personalizáveis
- Título e descrição customizáveis por categoria, produto e páginas estáticas.
- Slug personalizável por produto e categoria.
- Canonical automático baseado na URL primária da página.
- As tags `title` e `meta` são renderizadas server-side sempre que possível, para garantir rastreabilidade por crawlers sem suporte completo a JS.

### Open Graph / Twitter Cards
- Implementação ativa para cada produto, categoria e páginas institucionais.
- Tags otimizadas para compartilhamento em redes sociais com imagem, título e descrição relevantes.

### Schema Markup
- Produtos com `Product`, `AggregateRating` e `Offer`.
- Breadcrumb com `BreadcrumbList`.
- Página institucional com `Organization`.
- FAQ (para blog ou páginas com perguntas frequentes).
- [Ver mais detalhes em `docs/schema-strategy.md`](./schema-strategy.md)

### Sitemap e Robots
- Sitemap gerado automaticamente e atualizado por webhook a cada nova página publicada.
- `robots.txt` configurado para permitir apenas diretórios relevantes e bloquear paths técnicos.

### Canonical Tags
- Evita conteúdo duplicado com uso correto de tags `<link rel="canonical">` por padrão em todas as páginas.

### Performance e Core Web Vitals
- Next.js + otimização automática de imagens.
- Lazy loading inteligente (incluindo imagens, vitrines e avaliações).
- CDN e cache com headers corretos (incluindo `cache-control`, `etag`, `last-modified`).
- Fontes locais carregadas via preload para evitar bloqueio de renderização.

### SEO para Categorias
- Título (H1 para bots) com palavra-chave exata.
- Descrição introdutória com variações semânticas.
- Subtítulos com H2 e textos intermediários para profundidade semântica.
- Texto adicional final (opcional) com perguntas frequentes, sinônimos e CTAs.
- Meta title e description otimizados por padrão e ajustáveis no painel.
- Paginação técnica documentada em [`docs/paginacao-estrategia.md`](./paginacao-estrategia.md)

### SEO para Produtos
- Nome otimizado com palavra-chave principal.
- Descrição rica com termos relacionados e heading com H2 onde aplicável.
- Slug, meta title, meta description configuráveis individualmente.
- Schema automático com preço, disponibilidade, avaliações.
- Imagens de produto integradas ao schema com a propriedade `"image"`.

### SEO para Blog (futuro opcional)
- Título (H1) com palavra-chave principal.
- Subtítulos em H2/H3 com variações semânticas.
- Links internos estratégicos para produtos e categorias.
- Schema FAQ em posts com perguntas frequentes.

### 📏 Limites Recomendados
| Campo               | Tamanho Ideal | Onde é Validado            |
|---------------------|---------------|----------------------------|
| Meta title          | 50–60 chars   | Painel admin (front/back) |
| Meta description    | 120–160 chars | Painel admin (front/back) |
| Alt-text            | ≤125 chars    | Painel admin (front)      |

### Links Internos e Estratégia de Interligação
- Produtos relacionados e recomendados (crosslinks).
- Breadcrumbs clicáveis com microdados.
- Links internos contextuais em descrições (ex: produto → categoria, blog → produto).
- Página inicial com links para categorias principais e destaques sazonais.

### Integrações SEO
- Google Analytics 4 via GTM.
- Google Search Console com sitemap automatizado.
- Pixel do Facebook para remarketing e eventos.
- Feed com dados estruturados para Google Merchant Center (em versão futura).

### 🔍 Estratégia de Keywords
- Palavras-chave focadas por categoria e produto.
- Variações semânticas e termos de cauda longa incluídos em metadados e corpo da descrição.
- Evita canibalização entre categorias com títulos e metas únicos.

**Exemplo:**
- Página: `/vestido-infantil-verao`
- Meta title: "Vestido Infantil para Verão 2025 | Compre Online – Tout Spécial"
- Keywords-alvo: "vestido infantil verão", "roupa infantil algodão", "vestido leve menina verão"

---

Este documento é parte do conjunto de diretrizes de SEO. Consulte também:
- [`paginacao-estrategia.md`](./paginacao-estrategia.md)
- [`schema-strategy.md`](./schema-strategy.md)
