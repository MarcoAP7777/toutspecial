Infraestrutura do E-commerce (infra.md)
Visão Geral
A infraestrutura do e-commerce foi desenhada para garantir escalabilidade horizontal, alta performance, segurança e disponibilidade contínua. A arquitetura adota o modelo de microsserviços desacoplados, com Next.js SSR/SSG híbrido, CDN com cache agressivo e pipelines de CI/CD robustos. Todos os componentes são pensados para suportar alto tráfego, integrações críticas (como Vindi), SEO técnico avançado e observabilidade de ponta a ponta.

Arquitetura Geral
Frontend:

Next.js com SSR, SSG e fallback (getStaticProps + getServerSideProps)

Layout responsivo, rolagem infinita com hash na URL

Fontes, cores e vitrines configuráveis via painel administrativo

Backend:

APIs Node.js/Express modularizadas e versionadas (/api/v1/...)

Integração com Vindi e serviços externos via webhooks

Banco de Dados:

PostgreSQL (Supabase ou Neon) com migrations via Prisma

Modelagem relacional avançada com suporte a variações de produtos e controle de estoque por SKU

Cache:

Redis (Upstash) para sessões, autenticação e queries intensas

Armazenamento de Mídia:

Cloudflare R2 (preferencial), S3 ou Google Cloud Storage

CDN & Proteção:

Cloudflare: assets, regras de cache, firewall e DDoS mitigation

E-mails Transacionais:

Resend, SendGrid ou AWS SES com templates customizados (pedidos, recuperação de senha)

Busca:

Algolia (futuramente) ou busca nativa com filtros otimizados e indexação por relevância

Domínio de Desenvolvimento
Será utilizado um domínio alternativo (não subdomínio) para evitar indexação durante o desenvolvimento

Arquivo robots.txt com Disallow: /

Ambiente voltado a testes internos, integração com Vindi, validação de XML feed, sitemap e performance

Após a homologação, a troca de DNS será imediata e monitorada

Estratégia de Migração
Substituição da loja atual (Tray Commerce) mantendo exatamente as mesmas URLs

Sem redirecionamentos 301, mantendo autoridade e histórico SEO

Plataforma antiga será mantida como backup técnico com rollback via DNS

Monitoramento contínuo via Google Search Console

Importação de Dados
Importação via planilha .csv ou .xlsx com validações e pré-processamento

Campos suportados:

Nome, slug, SEO (title/meta), descrições, imagens, variações, estoque, selos, marca, peso, dimensões, EAN

Upload seguro via bucket protegido (Cloudflare R2 ou S3)

Logs detalhados e notificações em caso de falhas

Escalabilidade e Resiliência
Load balancing e fallback para APIs críticas

Filas assíncronas (ex: PDF de pedidos, disparo de e-mails)

Backups automáticos diários do banco de dados

Monitoramento ativo com alertas e dashboards por ambiente

Segurança
Rate limiting com express-rate-limit nos endpoints sensíveis (/checkout, /auth)

Headers de segurança com Helmet

TLS 1.3 obrigatório (HTTPS em toda a aplicação)

Webhooks autenticados (Vindi, pagamentos)

Política de CORS controlada

Regras de firewall na CDN e hospedagem

Controle de acesso baseado em roles (admin, operador, cliente)

LGPD e Privacidade
Cookies configuráveis via banner de consentimento

Criptografia de dados pessoais quando necessário

Política de dados acessível e clara no site

Opção de remoção de conta e dados pelo usuário

DevOps e CI/CD
CI/CD via GitHub Actions

Ambientes separados: dev, staging, production

Build com cache inteligente e deploy automático

Testes com Jest (unidade) e Playwright (end-to-end)

Linter, Prettier e TypeScript com strict: true

Documentação técnica centralizada na pasta `docs/`

Scripts de importação integrados ao pipeline de build

Observabilidade
Logs estruturados com níveis (info, warn, error)

Monitoramento de uptime e tempo de resposta

Dashboards por módulo e ambiente

Alertas automatizados via Slack ou e-mail

Recomendação de Deploy
Frontend: Vercel

Backend/API: Render, Railway ou Fly.io

Banco de dados: Supabase ou Neon

Cache: Upstash

CDN e segurança: Cloudflare

graph TD
A[Frontend Next.js] -->|API| B[Backend Node.js/Express]
B -->|Query| C[(PostgreSQL)]
B -->|Cache| D[Redis]
A -->|Assets| E[Cloudflare CDN]
C -->|Backup| F[Cloud Storage]
