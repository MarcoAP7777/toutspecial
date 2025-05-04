# 📦 Requisitos do E-commerce Tout Spécial (Next.js)

## ✅ Visão Geral

Projeto de desenvolvimento de um e-commerce de moda com foco em performance, SEO avançado, controle total da operação e integração com a Vindi. Painel administrativo robusto com cadastro completo de produtos, vitrines, relatórios, checkout confiável e interface moderna.

---

## ⚙️ Requisitos Funcionais (RF)

### 🛒 RF001 - Cadastro de Produtos/Categorias

- [x] Cadastro de produtos com variações (cor, tamanho, EAN, preço por variação).
- [x] Upload de múltiplas imagens por produto.
- [x] Estoque por variação com baixa automática ao finalizar pedido.
- [x] Campos de SEO:
  - H1 (visível apenas para bots).
  - Meta title (50-60 caracteres, com contador).
  - Meta description (120-160 caracteres, bloqueio se ultrapassar).
  - Slug editável.
  - Alt-text (máx. 125 caracteres, fallback: nome do produto).
- [x] Importação de produtos e categorias via planilha (.csv ou .xlsx).
- [x] Cadastro de marca, selo, gênero e ordenação de imagens.
- [x] Cadastro de categorias com imagem de capa e campos SEO.
- [x] Pré-visualização de produtos e categorias com layout real antes da publicação.

---

### 🪟 RF002 - Vitrines Configuráveis

- [x] Cadastro de vitrines manuais (nome + ordem dos produtos).
- [x] Seleção e ordenação via drag-and-drop (`display_order`).
- [x] Vitrine por selo ou categoria.

---

### 💳 RF003 - Carrinho e Checkout

- [x] Carrinho persistente com confirmação via toast/modal.
- [x] Integração com gateway de pagamento **Vindi**.
- [x] Geração de pedido, cobrança e baixa de estoque.
- [x] Mensagem de fallback da Vindi: “Pagamento indisponível. Seu carrinho foi salvo automaticamente. Tente novamente em 1 minuto.”
- [x] Fila de retentativas com expiração em 1h.
- [x] Checkout com fallback automático.
- [x] Recuperação de carrinhos abandonados via botão WhatsApp (cupom + link).

---

### 📁 RF004 - Navegação e Listagem

- [x] Rolagem infinita com hash na URL.
- [x] Filtros dinâmicos por variação, preço e categorias.
- [x] Busca com sugestões em tempo real.

---

### 🛠️ RF005 - Painel Administrativo

1- Introdução

Objetivo do painel
Quem são os usuários (admin, editor)
Tecnologias envolvidas (ex: Next.js Admin, API, JWT, etc.)

2- Fluxo de Acesso
Tela de login
Esquema de roles (admin vs. editor)
Política de segurança (token, timeout, criptografia de senha)

3- Layout Geral
Sidebar com seções por ordem:
Dashboard
Relatórios
Marketing
Aparência
Melhor Envio
Vindi
SEO
Google

Topbar (ex: Tout Spécial, usuário logado, botão "limpar cache do site", sair)

4-Funcionalidades por seção:

1. Dashboard (Performance da Loja)
   Filtros: período (últimos 7 dias default)

Indicadores:
Vendas (R$), Unidades, Visitas, Conversão (%)
Variação % comparado ao período anterior
Gráficos: pizza ou barra para canais de venda
Tabela: termos mais buscados
Alerta de produto sem estoque

2. Relatórios
   2.1 Vendas: por período, canal, estado, cliente (com ticket médio)
   2.2 Produtos: todos os cadastrados, mais vendidos, marcas mais vendidas
   2.3 Visitas: produtos mais procurados, categorias mais visitadas
   3.3 Logs (ações administrativas feitas por usuários)

Todos os relatórios devem ter a Exportação de dados (.csv de vendas, produtos, clientes)

3. Marketing
   3.1 Carrinhos abandonados: lista com nome, produtos, data, botão WhatsApp ou e-mail com template e cupom
   3.2 Banners: upload com campo link, posição, desktop/mobile
   3.3 Cupons: valor fixo ou %, validade, frete grátis, desconto + frete grátis, restrições
   3.4 XML: exibir os links (Google Shopping, Meta), deverá exibir o preço promocional e com desconto da forma de pagamento.
   3.5 Avaliações da loja: moderação, resposta
   Mais detalhes em: RF011 Avaliação da Loja

3.6 Avaliações de produtos:
Detalhes em: RF012 Avaliação de Produtos
3.7 Newsletter: exportar base
3.8 Programa fidelidade: config. pontos por real, valor do ponto, validade

4. Aparência da Loja
   4.1 Páginas internas: CRUD (Sobre, Política, etc.)
   Deverá permitir informar o SEO, H1, Meta Title. Meta Description

4.2 Textos e mensagens: rodapé e contato
4.3 Vitrines: definir nome, ordem, selos
4.4 Layout (cores, fontes, layout live preview)

5. Melhor Envio
   Integração (se necessário exibir dados ou configurações)

6. Vindi
   Configuração do checkout
   Link direto para painel Vindi

7. SEO
   7.1 Cadastro H1, H2, Meta Title, Meta Description e Description da Home,
   7.2 Cadastro de redirecionamentos 301 com status ativo/inativo
   mais detalhes de SEO em RF006 - SEO Avançado

8. Google
   Campos para:
   Google Tag Manager ID
   Google Analytics 4 ID

---

### 🔍 RF006 - SEO Avançado

- [x] URLs limpas e slugs editáveis.
- [x] Metadados configuráveis.
- [x] Sitemap dinâmico, `robots.txt`, canonical tag.
- [x] Schema markup:
  - Produto (Product)
  - Organização
  - Breadcrumb
  - FAQ
- [x] Open Graph + Twitter Card.
- [x] Textos alternativos e semântica (H1, H2, etc).
- [x] Redirecionamentos 301 via middleware (Next.js).

---

### 🧾 RF007 - Página de Produto

- [x] Abas de conteúdo (descrição, medidas, avaliações) com lazy loading.
- [x] Galeria com zoom e variações.
- [x] Produtos relacionados e recentemente visualizados.
- [x] Confirmação ao adicionar ao carrinho (toast/modal).
- [x] Selos e porcentagem de desconto visível.

---

### 👤 RF008 - Cadastro de Clientes

- Campos:
  - Nome completo
  - E-mail (único)
  - Senha + confirmação
  - Telefone
  - Data de nascimento (opcional)
  - CPF/CNPJ
  - Endereço, complemento, bairro, cidade, estado, CEP
  - Consentimento LGPD
- Cadastro sem endereço permitido.
- Endereço obrigatório no momento da compra (atualiza cadastro).

---

### 🔐 RF009 - Login

- [x] Login via e-mail + senha (JWT).
- [x] Lembre-se de mim (cookie opcional).
- [x] Redirecionamento inteligente pós-login (volta à página anterior ou dashboard).

---

### 🧾 RF010 - Tela Checkout

- Cliente precisa estar logado.
- Endereço de entrega atualiza cadastro.
- Pedido criado com:
  - Dados do cliente
  - Endereço
  - Produtos
  - Valores
  - Forma de pagamento

### 🧾 RF011 Avaliação da Loja:

- Página pública com nota média e comentários.
- Pode ser feita por clientes ou leads.
- Moderação via dashboard.
- Exibida no final da homepage (antes do rodapé).

### 🧾 RF012 Avaliação de Produtos:

- Apenas para clientes logados.
- Redirecionamento inteligente pós-login para avaliação.
- Estrutura:
  - ⭐ Rating (1 a 5)
  - 💬 Comentário (opcional)
  - Nome parcialmente exibido (ex: Juliana M.)
  - Data
  - Status: pendente, aprovado, rejeitado
  - Destaque (exibir no topo)
  - Resposta da loja (opcional)
- Moderação via dashboard.
- Usado em schema markup: `AggregateRating`, `Review`.

### 📜 RF013 - Consentimento LGPD

- Modal de cookies no primeiro acesso (com revogação).
- Armazenamento via cookie/localStorage.
- Checkbox obrigatório no cadastro:
  > “Li e concordo com a Política de Privacidade e os Termos de Uso da Tout Spécial.”

---

### 🎯 RF014 - Descontos por Produto

- Preço promocional por SKU (obrigatório).
- Preço por variação (opcional; herda do produto).
- Agendamento de início/fim da promoção.
- Exibição “De R$... Por R$...” + % de desconto.

---

### 🎟️ RF015 - Cupom de Desconto

- Aplicado no carrinho/checkout (1 cupom por pedido).
- Tipos:
  - % ou valor fixo
  - Frete grátis
  - Ambos
- Validação automática de data/status.
- Hierarquia:
  - Promoção por SKU → depois cupom.
- Exibição no carrinho:
  - Total cheio
  - Total com promo
  - Desconto do cupom
  - Frete/isento
- Cupom usado deve constar no pedido.

---

### 🔐 RF016 - Recuperação de Senha

- Solicitação com e-mail (sem revelar existência).
- Token único (expira em 1h), salvo com hash.
- Link enviado por e-mail (ex: `/reset-password?token=abc123`).
- Página valida token e permite nova senha.
- Invalida token após uso.
- Envia e-mail de confirmação e encerra sessões ativas.

---

### 🚚 RF017 - Integração Melhor Envio

**Admin:**

- Habilitar transportadoras.
- Definir regras de frete grátis por:
  - Valor mínimo (ex: R$300 SP, R$400 outros).
  - Região (estados, CEPs).
- Margem de segurança para cálculo.

**Pedidos:**

- Envio automático para Melhor Envio.
- Status de rastreio sincronizado.

**Cliente:**

- Cálculo de frete no checkout.
- Acompanhamento via conta do cliente.
- Notificações de entrega.

---

## ⚙️ Requisitos Não Funcionais (RNF)

### ⚡ RNF001 - Performance

- Next.js com otimização de imagem e CDN.
- Cache inteligente (SWC, headers).
- Preload de fontes e JS críticos.
- Lighthouse Score ≥90 (mobile/desktop).
- TTFB <500ms (4G).
- CLS <0.1 em todas as páginas.
- Cache para consultas frequentes.

---

### 🔒 RNF002 - Segurança

- Rate limiting em rotas sensíveis.
- Integração antifraude via Vindi.
- JWT + cookies HttpOnly para painel.
- Role-based access para rotas privadas.
- Tabela de tentativas de login.

---

### 🛡️ RNF003 - Confiabilidade e Backup

- Backup automático no servidor.
- Fallback para falha na API Vindi com fila.
- Suporte a rollback rápido (manutenção da Tray).

---

### 🔐 RNF004 - LGPD e Privacidade

- Modal de cookies.
- Política de privacidade acessível.
- Controle de dados sensíveis de clientes.

---

### 🧩 RNF005 - API

- Versionamento (ex: `/api/v1/products`).
- Documentação Swagger/OpenAPI.

---

### 🧪 RNF006 - Testes

- **Cypress**: checkout completo (produto → pagamento).
- **Jest**: cobertura ≥80% em serviços críticos (estoque, pedidos).

---
