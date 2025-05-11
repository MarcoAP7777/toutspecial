# 🛍️ E-commerce Tout Spécial - Projeto Next.js

Este projeto é o novo e-commerce da **Tout Spécial**, uma loja de moda com controle total sobre a plataforma, desempenho elevado e foco extremo em **SEO, escalabilidade e experiência do usuário**.

> 🔄 A migração será feita da plataforma Tray Commerce para uma estrutura independente, mantendo todas as URLs originais, produtos e categorias através de uma importação inteligente por planilha (.csv/.xlsx). Não haverá redirecionamentos.

---

## ✅ Etapas do Projeto

1. **Configurações Gerais e Estrutura Base**
2. **Cadastro de Produtos e Categorias**
3. **Frontend da Loja (Catálogo, Carrinho, PDP)**
4. **Integração com Vindi (Checkout e Cobrança)**
5. **SEO Avançado e Otimizações de Conversão**
6. **Infraestrutura, Deploy e Observabilidade**

📄 Ver detalhes em [`docs/etapas.md`](./docs/etapas.md)

---

## ⚙️ Stack Tecnológica

- **Next.js** (App Router, Server Components)
- **TailwindCSS** + **Framer Motion**
- **PostgreSQL** + ORM (Prisma ou Drizzle)
- **Node.js** + Express (API backend/admin)
- **Redis** (cache de páginas e listas)
- **Zod** (validação de schemas)
- **Vercel / Render / Railway** (deploy)
- **Vindi** (gateway de cobrança)
- **Planilha CSV/Excel** (importação de dados da Tray)

---

## 🧩 Funcionalidades de Destaque

- Importação de produtos e categorias a partir de planilha (URL, SEO, descrições, imagens, variações)
- Cadastro de produtos com:
  - Variações (cor, tamanho)
  - Estoque e peso por variação
  - EAN, medidas, selos, marca
- SEO OnPage completo: meta tags, canonical, schema markup
- Rolagem infinita com hash na URL
- Vitrines configuráveis com prioridade via admin
- Sistema de selos (ex: Promoção, Lançamento, Black Friday)
- Painel administrativo com pré-visualização de temas (fontes, cores)
- Integrações com Instagram, GA4, GTM, Facebook Pixel
- Tabela de medidas e avaliações com lazy loading
- Geração de pedidos e baixa automática de estoque
- Rate limiting em APIs críticas (ex: checkout)
- LGPD e backup automático incluídos

---

## 📦 Estratégia de Migração

- Durante o desenvolvimento, será utilizado um domínio alternativo (não subdomínio), com `robots.txt` bloqueando indexação para evitar qualquer impacto no SEO.
- Todo o conteúdo será importado da Tray por planilha validada, mantendo slugs, SEO OnPage e dados estruturados.
- Antes da troca de DNS, serão validados: layout, sitemap.xml, feeds XML do Merchant Center e rastreamento no Google Search Console.
- Após validação, o DNS será alterado para apontar para a nova estrutura.
- A plataforma Tray será mantida como backup, com possibilidade de rollback rápido via reversão de DNS.

---

## 🗂️ Documentação Técnica

| Documento                                     | Descrição |
|----------------------------------------------|------------|
| [`docs/etapas.md`](./docs/etapas.md)         | Etapas detalhadas do projeto |
| [`docs/frontend.md`](./docs/frontend.md)     | UX e arquitetura da loja |
| [`docs/infra.md`](./docs/infra.md)           | Infraestrutura, DNS, cache, backups |
| [`docs/seo.md`](./docs/seo.md)               | Técnicas de SEO OnPage e técnico |
| [`docs/modelagem.md`](./docs/modelagem.md)   | Modelagem de dados com índices e enums |
| [`docs/paginacao-estrategia.md`](./docs/paginacao-estrategia.md) | Estratégia de paginação para SEO e UX |
| [`docs/schema-strategy.md`](./docs/schema-strategy.md) | Estratégia de uso de schema markup |
| [`docs/requisitos.md`](./docs/requisitos.md) | Regras de negócio e requisitos não-funcionais |
| [`docs/admin.md`](./docs/admin.md)           | 
| [`docs/fashion-attributes-guide.md`](./docs/fashion-attributes-guide.md) |define os atributos técnicos padronizados usados no cadastro de produtos
---

## 🚀 Rodando Localmente

```bash
git clone https://github.com/seu-usuario/toutspecial-next.git
cd toutspecial-next
pnpm install
pnpm dev
```

---

## 🤖 Notas para IA  
- **Objetivo principal**: Criar um e-commerce de moda performático e fácil de manter.  
- **Prioridades**:  
  1. SEO e Core Web Vitals.  
  2. Integração perfeita com Vindi.  
  3. Painel admin intuitivo.  
- **Padrões de código**:  
  - Componentes React nomeados como `ProductCard.tsx`, `ShowcaseGrid.tsx`.  
  - APIs REST em `/api/*` com validação Zod.  


## 📌 Observações Finais

- Todo o projeto segue boas práticas de performance (Core Web Vitals, Lighthouse 90+)
- As recomendações do DeepSeek para SEO, UX e segurança foram incorporadas
- Requisições de funcionalidades extras ou novos módulos devem seguir os padrões já definidos nos `docs`

---

## 🧑‍💻 Contribuindo

Para contribuições, abra uma issue ou envie um PR com descrição clara do que foi alterado.

---

Com carinho, pela equipe da **Tout Spécial 💖**

