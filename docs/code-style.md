# Code Style Guide — Tout Spécial E-commerce

Este documento define as diretrizes de estilo de código para o projeto e-commerce da Tout Spécial, garantindo padronização, legibilidade e consistência entre todas as partes do sistema.

---

## ✳️ Tecnologias Utilizadas

- **Frontend**: Next.js com TypeScript
- **Backend**: APIs Node.js/Express (ou Next.js API routes)
- **Banco de Dados**: PostgreSQL com Prisma
- **CI/CD**: GitHub Actions
- **Hospedagem**: Vercel (frontend), Render/Railway/Fly.io (backend)
- **Outros**: Redis (cache), Cloudflare CDN, Cloud Storage (imagens)

---

## 📦 Organização de Pastas

- `/app` ou `/src` (dependendo da estrutura escolhida no `create-next-app`)
- `/components`: Componentes reutilizáveis
- `/lib`: Funções auxiliares (helpers, API clients, formatações)
- `/styles`: Estilos globais ou helpers de Tailwind
- `/types`: Tipagens globais (interfaces, enums)
- `/services`: Serviços externos (ex: Vindi, APIs)
- `/hooks`: React hooks reutilizáveis
- `/contexts`: Context API Providers
- `/pages/api`: Endpoints internos (caso não use backend separado)
- `/docs`: Documentação técnica (README, code-style, infra, etapas)

---

## 🧠 Convenções de Código

### Geral
- Sempre usar **TypeScript** com tipagens explícitas.
- Nomes descritivos, **sem abreviações confusas**.
- Comentários apenas quando necessário para **clareza do negócio**, não para descrever lógica óbvia.
- Preferência por **funções puras e reutilizáveis**.

### Imports
- Usar `@/` para caminhos absolutos (ex: `@/components/Banner`)
- Agrupar e ordenar:
  1. Módulos externos
  2. Módulos internos (ordenados por escopo)
  3. Estilos

### Nomeação
- Componentes React: `PascalCase`
- Funções: `camelCase`
- Constantes globais: `UPPER_CASE`
- Arquivos: `kebab-case.tsx` ou `.ts`

### Componentes
- **Funcionais (function components)** com arrow functions
- Usar **React.FC** apenas se precisar de children tipados
- Evitar `any` — preferir tipos ou `unknown`
- Dividir componentes grandes em arquivos menores

---

## 🎨 Estilo e Formatação

- **Linter**: ESLint com Airbnb base
- **Formatter**: Prettier com configurações padrão
- **Tailwind CSS**:
  - Usar classes utilitárias com ordem lógica (layout → cor → tipografia → spacing)
  - Evitar `!important` ou `style` inline
- Usar `clsx` ou `classnames` para condicional de estilos

---

## 🧪 Testes

- **Framework**: Jest (unitários), Playwright (E2E)
- Estrutura recomendada:
  - `/tests/unit/...`
  - `/tests/e2e/...`
- Nomeação dos arquivos: `*.spec.ts` ou `*.test.tsx`
- Cobertura mínima: **80%**

---

## 🛡️ Segurança

- Não armazenar tokens ou segredos em arquivos de código.
- Usar `.env.local`, `.env.production`, etc.
- Nunca fazer commit de arquivos `.env`.
- Variáveis sensíveis devem ser tipadas via `process.env.VARIABLE as string`

---

## 📤 Commits

Seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):
feat: nova funcionalidade
fix: correção de bug
docs: mudanças na documentação
refactor: melhoria de código sem alterar comportamento
style: formatação, indentação, etc
test: criação ou ajuste de testes
chore: tarefas auxiliares


---

## 🚀 Performance e SEO

- Usar `next/image` para otimização de imagens
- Usar `Head` corretamente em todas as páginas com title e meta description
- Implementar `schema.org` e `structured data` em produtos e categorias
- Usar `loading="lazy"` e pré-carregamento com `priority` para imagens críticas
- SSR e SSG com fallback configurado

---

## 🔌 Integrações

- **Vindi**: integração com fallback e webhooks autenticados
- **Cloudflare**: assets via CDN, roteamento, proteção
- **Redis**: cache de autenticação, sessões e filtros

---

## 📈 Observabilidade

- Logs com níveis (`info`, `warn`, `error`)
- Alertas via Slack ou e-mail
- Dashboard para ambiente de produção

---

## 🔄 Versão e Documentação

- Toda nova funcionalidade ou módulo deve vir acompanhada de documentação (README ou `docs/*.md`)
- As versões do projeto devem ser documentadas no `README.md`
- Alterações relevantes de arquitetura ou regras devem ser atualizadas em `infra.md` ou `etapas.md`

---

## ✅ Checklist para PRs

- [ ] Código segue os padrões acima?
- [ ] Tipagens estão corretas e sem `any`?
- [ ] Tem teste para nova lógica?
- [ ] Nova função está bem nomeada e reutilizável?
- [ ] Documentação atualizada se necessário?

---

## 📚 Documentação Relacionada

- [`README.md`](../README.md) — visão geral do projeto
- [`infra.md`](./infra.md) — infraestrutura técnica e arquitetura
- [`etapas.md`](./etapas.md) — planejamento modular do desenvolvimento

