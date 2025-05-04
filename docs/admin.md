### Painel Administrativo - Tout Spécial E-commerce

### Visão Geral

O painel administrativo será robusto, configurável e modular, oferecendo total controle sobre:

- Cadastro e gerenciamento de produtos com variações
- Configuração de vitrines da homepage e banners
- Controle de estoque por variação (com baixa automática a cada pedido)
- Ajustes de layout (fontes, cores, logos)
- Gerenciamento de pedidos e status
- Dashboard de vendas e métricas
- SEO OnPage de páginas e produtos
- Gerenciamento de avaliações e reviews de produtos
- Cadastro e edição de conteúdos fixos (ex: páginas institucionais)
- Controle completo de usuários e permissões

### Funcionalidades

#### 1. Cadastro de Produtos

- Nome, descrição curta, descrição longa (com editor WYSIWYG)
- Slug personalizado
- SKU por variação
- EAN, peso, dimensões por variação
- Imagens com ordenação drag-and-drop
- Categorias múltiplas
- Selo de produto
- Destaque em vitrine
- Estoque por variação (tamanho/cor)
- Produtos relacionados (manual e por regra)
- Compre junto (produto associado com ordem de exibição)

#### 2. Controle de Categorias

- Cadastro de categorias e subcategorias
- URL slug amigável
- Descrição interna (com editor WYSIWYG), H1, Meta Title e Meta Description
- Ordenação manual de produtos por drag-and-drop (campo display_order)
- Inserção de produtos fixos e lógicos na categoria
- Gerenciamento de selos por categoria

#### 3. Gerenciamento de Vitrines

- Cadastro de vitrines e inserção de produtos por drag-and-drop
- Ordenação via campo display_order
- Filtro por selo, categoria, data de lançamento

#### 4. Layout e Aparência

- Escolha de fontes (Google Fonts)
- Paleta de cores (primária/secundária/hover)
- Upload de logo (mobile e desktop)
- Preview em tempo real antes de salvar

#### 5. SEO Avançado

- Permite editar H1, meta tags e descrições
- Gerenciamento de slugs e redirects
- Upload de sitemap
- Schema Markup configurável por tipo de página (produto, categoria, institucional)
- Preview de snippets Google (título/meta/URL)

#### 6. Pedidos e Vendas

- Lista de pedidos com filtros por status/data
- Detalhes do pedido com visualização por variação
- Atualização de status e envio manual de e-mail
- Exportação CSV
- Acompanhamento de histórico do pedido (log de eventos)
- Baixa automática de estoque por variação ao finalizar pedido

#### 7. Dashboard

- Pedidos
- Vendas por período
- Produtos mais vendidos
- Taxa de conversão
- Avaliações recebidas por período
- Carrinhos abandonados (em integração futura com Vindi)
- Preparado para receber métricas técnicas de SEO (ex: Core Web Vitals, indexação por URL)

#### 8. Configurações Gerais

- Política de frete, devolução, privacidade
- LGPD e cookies
- Integração com Vindi (Webhooks, callbacks)
- Integração com Google Analytics, GTM, Meta Pixel
- Gerenciamento de páginas institucionais (Sobre, FAQ, Contato)

#### 9. Importação via Planilha

- Upload de planilha CSV/XLSX para cadastro em massa de produtos e categorias
- Campos obrigatórios: nome, slug, preço, variações, estoque
- Validação e pré-visualização antes da importação
- Log de erros e conflitos por linha
- Suporte a atualização em massa (modo sobrescrever)
- Mapeamento visual de campos da planilha
- Utilizada também no processo de migração inicial da plataforma Tray para o novo sistema

#### 10. Testes e Validações no Admin

- Testes unitários para componentes críticos do painel
- Testes e2e para fluxos de cadastro e pedidos
- Rotina de testes automatizados para regressões no painel

#### 11. SEO no Admin (complementar)

- Inserção de Schema Markup estruturado (produtos, breadcrumbs, reviews)
- Preview de snippets Google (título/meta/URL)
- Análise de preenchimento de campos críticos de SEO (checklist automatizado)

#### 12. Segurança e Permissões

- Controle de acesso por perfil (Admin, Marketing, Desenvolvedor)
- Logs de atividade
- Rate Limiting e proteção para endpoints críticos
- Permissões granulares por módulo do admin

#### 13. Extensibilidade

- Estrutura preparada para criação de plugins no admin
- Painéis customizáveis por tipo de usuário
- Endpoint para APIs externas consultar dados do catálogo
- Webhooks por evento do admin (produto editado, pedido alterado, etc.)

#### 14. Experiência do Usuário (UX)

- Feedback visual ao salvar (toast/sucesso)
- Modais claros para ações destrutivas (ex: excluir produto)
- Campos com auto-save onde aplicável
- Interface com suporte a tema claro/escuro
- Acessibilidade com ARIA

#### 15. Avaliações e Reviews

- Listagem de avaliações com moderação (aprovar/reprovar)
- Campos de nota (1-5 estrelas), comentário, nome e data
- Destaque de avaliações aprovadas por produto
- Filtro por status (pendente/aprovado/reprovado)
- Visualização agrupada por produto

#### 16. Melhorias Futuras

- Editor visual para landing pages e banners
- Histórico de alterações por produto
- Ferramenta de comparação A/B para cores e vitrines
- Integração com sistemas de ERP ou marketplace (via API)
- Editor visual de conteúdo institucional (Sobre, FAQ)
- Integração futura com sistema de notificações push
