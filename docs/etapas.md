# Etapas do Projeto - E-commerce de Moda Tout Spécial (Next.js)

## ✅ Visão Geral

* Framework principal: **Next.js com SSR**
* Stack: React + Tailwind CSS + ShadCN UI + Prisma + PostgreSQL/MySQL
* Gateway de pagamento: **Vindi**
* Domínio temporário exclusivo durante o desenvolvimento (sem subdomínio, sem indexação)
* Documentação centralizada no `README.md`
* **Painel Administrativo é prioridade absoluta**

---

## 1. 🧩 Etapa 1: Configurações Iniciais e Estrutura

* Setup do ambiente de desenvolvimento
* Configuração do repositório com README e requisitos
* Configuração inicial do painel administrativo (com layout base)
* Estruturação do banco de dados com ORM Prisma
* Sistema de autenticação e RBAC (usuários/admins)

---

## 2. 📦 Etapa 2: Cadastro e Painel Administrativo (Prioridade)

### Cadastro Avançado de Produtos

* Nome, descrição, preço e promoção
* Múltiplas categorias por produto
* Selos (Infantil, Juvenil, Adulto, Promoção)
* Marca, gênero, imagens (com ordenação e destaque)
* SKU, EAN, peso e dimensões por variação
* Ativo/Inativo
* Preview de como o produto aparecerá na loja

### Variações

* Cor (nome + cor visual)
* Tamanho
* Estoque por variação

### SEO OnPage (por produto e categoria)

* Meta Title, Meta Description, Slug amigável
* Texto alternativo nas imagens

### Cadastro de Categorias e Vitrines

* Nome, descrição, imagem de capa
* SEO completo por categoria
* Exibição condicional de produtos/categorias
* Cadastro de vitrines manuais, por selo ou categoria

### Admin: Recursos Complementares

* Importação via planilha (produtos e categorias)
* Importação inteligente de dados da Tray
* Controle de layout e temas (cores, fontes)

---

## 3. 🛍 Etapa 3: Frontend da Loja

### Catálogo e Listagens

* Rolagem infinita com hash na URL (`/categoria#p3`)
* Vitrines por selo, categoria ou manual
* Filtros: categoria, tamanho, cor, marca, preço, selo

### Página de Produto

* Galeria com zoom
* Variações com seleção ativa
* Preço cheio, promocional, desconto
* Tabs "Descrição", "Tabela de Medidas" e "Avaliações" com lazy loading

### Carrinho e Checkout

* Carrinho lateral flutuante
* Cálculo de frete
* Checkout com Vindi
* Confirmação de adção via toast/modal
* Geração de pedido com baixa de estoque

---

## 4. 💳 Etapa 4: Integração com Vindi

* Criação de cliente, pedido e pagamento via API
* Webhooks para confirmação de status de pagamento
* Fallback para falhas de comunicação
* Validação e prevenção de fraude (Vindi)

---

## 5. 🔍 Etapa 5: SEO, Analytics e Marketing

### SEO Avançado

* Estrutura semântica (H1, H2, etc)
* Meta tags dinâmicas, canonical, OG e Twitter Card
* Schema Markup para produtos e organização
* Sitemap.xml e robots.txt dinâmicos

### Ferramentas e Recursos

* Google Analytics, Tag Manager, Facebook Pixel
* Plugin de Instagram feed
* Popup de lead com consentimento

### LGPD

* Banner de cookies e consentimento
* Política de privacidade acessível

---

## 6. 🧱 Etapa 6: Infraestrutura, Performance e Testes

* APIs REST via `/api/*` do Next.js
* Rate limiting para endpoints sensíveis
* Cache/CDN (Vercel ou VPS + Edge Functions)
* Backup automático do banco
* Testes unitários e e2e com Playwright
* Monitoramento e logs

---

## 🔁 Pós-Go-Live e Manutenção

* Migração para o domínio oficial
* Validação de sitemap, XML feed, Google Search Console
* Suporte inicial pós-lançamento
* Monitoramento de performance e correção de bugs
