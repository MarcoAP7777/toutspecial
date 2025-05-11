# 🛍️ Tout Spécial E-commerce

E-commerce de moda desenvolvido com Next.js, focado em performance, SEO avançado e experiência do usuário.

## 📋 Visão Geral

O Tout Spécial é um e-commerce de moda que utiliza tecnologias modernas para garantir uma experiência de compra excepcional. O projeto é construído com Next.js, TypeScript e uma arquitetura robusta que prioriza performance, SEO e segurança.

## 📚 Documentação Completa

A documentação detalhada do projeto está disponível na pasta `docs/`:

| Documento                                             | Descrição                                     |
| ----------------------------------------------------- | --------------------------------------------- |
| [Etapas do Projeto](docs/etapas.md)                   | Etapas detalhadas do projeto                  |
| [Frontend](docs/frontend.md)                          | UX e arquitetura da loja                      |
| [Infraestrutura](docs/infra.md)                       | Infraestrutura, DNS, cache, backups           |
| [SEO](docs/seo.md)                                    | Técnicas de SEO OnPage e técnico              |
| [Modelagem](docs/modelagem.md)                        | Modelagem de dados com índices e enums        |
| [Paginação](docs/paginacao-estrategia.md)             | Estratégia de paginação para SEO e UX         |
| [Schema Markup](docs/schema-strategy.md)              | Estratégia de uso de schema markup            |
| [Requisitos](docs/requisitos.md)                      | Regras de negócio e requisitos não-funcionais |
| [Admin](docs/admin.md)                                | Documentação do painel administrativo         |
| [Atributos de Moda](docs/fashion-attributes-guide.md) | Guia de atributos técnicos padronizados       |
| [Estilo de Código](docs/code-style.md)                | Padrões e convenções de código                |

## 🏗️ Arquitetura

### Frontend

- Next.js com SSR/SSG
- TypeScript
- Tailwind CSS
- Componentes React otimizados
- SEO avançado com schema markup

### Backend

- APIs Node.js/Express
- PostgreSQL com Prisma
- Redis para cache
- Webhooks para integrações

### Infraestrutura

- Vercel (frontend)
- Render/Railway (backend)
- Cloudflare (CDN e segurança)
- Supabase/Neon (banco de dados)

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 20.x
- npm 9.x
- PostgreSQL 13.x
- Redis

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/toutspecial.git
cd toutspecial
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
# Edite o .env.local com suas configurações
```

4. Inicie o banco de dados:

```bash
npm run db:setup
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run test` - Executa testes unitários
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Executa testes com cobertura
- `npm run cypress:open` - Abre o Cypress para testes E2E
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:seed` - Popula o banco com dados de teste

## 📁 Estrutura de Pastas

```
src/
├── components/     # Componentes React reutilizáveis
├── lib/           # Funções auxiliares e utilitários
├── services/      # Integrações com serviços externos
├── styles/        # Estilos globais e configurações do Tailwind
├── types/         # Definições de tipos TypeScript
├── hooks/         # React hooks customizados
├── contexts/      # Contextos React
├── pages/         # Páginas e rotas
│   ├── api/       # Endpoints da API
│   └── admin/     # Painel administrativo
└── utils/         # Funções utilitárias
```

## 🌐 Ambiente

### Desenvolvimento

- URL: http://localhost:3000
- API: http://localhost:3000/api
- Admin: http://localhost:3000/admin

### Produção

- URL: https://toutspecial.com.br
- API: https://api.toutspecial.com.br
- Admin: https://admin.toutspecial.com.br

## 🚢 Deploy

O deploy é automatizado via GitHub Actions:

1. Push para `main` - Deploy automático para produção
2. Push para `develop` - Deploy automático para staging
3. Pull Request - Deploy para preview

### Fluxo de Deploy

1. Build do projeto
2. Execução de testes
3. Validação de linting
4. Deploy para ambiente apropriado
5. Notificação via Slack

## 🔍 Monitoramento

- **Sentry** - Monitoramento de erros
- **LogRocket** - Gravação de sessões
- **Google Analytics** - Análise de tráfego
- **Lighthouse CI** - Monitoramento de performance

## 📊 Logs

Logs estruturados com os seguintes níveis:

- ERROR - Erros críticos
- WARN - Avisos
- INFO - Informações gerais
- DEBUG - Debugging

## 🔒 Segurança

- JWT para autenticação
- Rate limiting em endpoints sensíveis
- Headers de segurança configurados
- Validação de dados em todas as entradas
- Sanitização de saídas

## 📈 Performance

- Score Lighthouse > 90
- TTFB < 500ms
- CLS < 0.1
- LCP < 2.5s
- FID < 100ms

## 🤝 Contribuição

Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
