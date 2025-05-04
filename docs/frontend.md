Frontend do E-commerce (frontend.md)
🧭 Visão Geral
O frontend do e-commerce da Tout Spécial é construído com Next.js (App Router), utilizando SSR, SSG e ISR para otimização de performance e SEO. A arquitetura é mobile-first, com forte foco em reutilização de componentes, responsividade, acessibilidade e carregamento progressivo de conteúdo.

A estrutura foi pensada para proporcionar experiência fluida ao usuário, mantendo alto desempenho e controle total sobre SEO técnico, integrando-se com as estratégias de paginação, modelagem e infraestrutura.

⚙️ Tecnologias Utilizadas
Next.js (App Router) com Server Components e rotas híbridas (SSR, SSG, ISR).

Tailwind CSS com design system proprietário.

Shadcn/ui para consistência de UI.

Framer Motion para microinterações e transições suaves.

Lucide-react para ícones leves e modernos.

Recharts para dashboards do admin.

React Query / SWR para cache e reatividade de dados.

Prisma ORM para acesso ao banco relacional.

Playwright para testes de ponta a ponta (E2E).

🧠 Funcionalidades Principais
Scroll infinito com hash na URL (#2, #3) para marcação visual.

Vitrines configuráveis por categoria, selo, curadoria manual.

Meta Tags dinâmicas e Schema Markup completo.

Carregamento prefetchado de páginas e produtos.

Importação via planilha com preview visual e validação.

Pré-visualização ao vivo de temas (cores, fontes, banners).

Dark mode com alternância persistente.

Componentes 100% reutilizáveis e desacoplados.

📄 Estrutura de Páginas
Home: destaques, vitrines dinâmicas, banners.

Categoria: scroll infinito com filtros dinâmicos.

Produto (PDP): galeria, variações, medidas, reviews, schema completo.

Carrinho: acessível em todas as páginas, cálculo de frete incluso.

Checkout: direto, com integração à Vindi.

Perfil: pedidos, favoritos, dados cadastrais.

Login/Cadastro: JWT + suporte futuro a login social.

Admin: completo, modular e extensível:

Cadastro de produtos e categorias com SEO

Configuração de vitrines e banners

Preview de layout e temas

Importação com mapeamento de colunas

🧩 Componentes Estratégicos
ProductCard: otimizado para SEO e lazy loading.

ProductBadge: exibe selos configuráveis (ex: “lançamento”, “oferta”).

Showcase: vitrine reordenável com múltiplos critérios.

FilterSidebar: com filtros avançados e multi-seleção.

InfiniteScrollList: usado em categorias e vitrines.

ProductGallery: imagens com zoom, thumbs e vídeos.

AdminEditor: pré-visualização visual com render em tempo real.

♿ Acessibilidade (A11y)
Navegação via teclado e foco visível.

ARIA roles e landmarks corretos.

Contrastes verificados conforme WCAG 2.1.

Leitura de imagem via alt-text dinâmico (com fallback automático via Meta Title, conforme paginacao-strategia.md).

⚡ Performance
Otimização automática com next/image.

Fontes com carregamento assíncrono (font-display: swap).

Code splitting por rota e componente.

Skeleton loaders e lazy loading de conteúdo.

Prefetch inteligente de rotas e dados.

Hidratação eficiente com fallback e cache local.

🎯 Experiência do Usuário
Toasts de feedback (ações bem-sucedidas ou erros).

Microinterações suaves via Framer Motion.

Tabs com carregamento sob demanda (PDP).

Navegação sem recarregamento (SPA-like).

Checkout fluido, direto e sem etapas desnecessárias.

Filtros persistentes e atualizáveis via URL + estado local.

🔍 SEO Técnico
URLs limpas e estáveis.

Meta Title e Description dinâmicos por página.

Slugs configuráveis manualmente ou via planilha.

Canonical tags automáticas por tipo de página.

Suporte completo a Schema.org (produto, breadcrumbs, reviews, etc).

Sitemap.xml e robots.txt gerados dinamicamente.

Suporte a Open Graph, Twitter Cards e prévias sociais.

Renderização completa para bots com até 80 produtos via SSR (ver paginacao-strategia.md).

✅ Testes
Unitários: hooks e componentes críticos.

E2E com Playwright: fluxo completo de compra e login.

Visual/Snapshot: para regressão visual (opcional).

Testes com bots (Googlebot) via logs + Google Search Console.

🔧 Melhorias em Andamento e Futuras
Conclusão do sistema de preview ao vivo (admin).

Suporte a navegação offline e PWA básico.

Login social (Google, Apple, Facebook).

Filtros favoritos por usuário.

Sistema de banners com ordenação e agendamento.

Redirecionamentos 301 via painel após MVP.

Backup e versionamento de vitrines.

🛠 Infraestrutura Frontend
Ambiente de staging isolado com domínio separado.

Proteção contra indexação prematura (X-Robots-Tag, robots.txt).

CDN para assets e imagens (com suporte a cache e fallback).

Middleware para fallback de carregamento e erros previsíveis.

Rate limiting para APIs críticas, como /api/checkout e login.

Logs estruturados para análise de performance e rastreamento.

Nota: Este documento deve ser mantido sincronizado com etapas.md, infra.md, modelagem.md e paginacao-strategia.md para evitar divergência entre front-end, lógica de negócio e regras de SEO.
