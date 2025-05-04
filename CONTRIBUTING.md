# Guia de Contribuição

## Como Contribuir

1. **Fork** o repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## Padrões de Código

- Siga o [Guia de Estilo de Código](docs/code-style.md)
- Use TypeScript para todo o código
- Mantenha os testes atualizados
- Documente novas funcionalidades

## Processo de Desenvolvimento

1. **Desenvolvimento Local**

   - Clone o repositório
   - Instale as dependências: `npm install`
   - Execute o servidor de desenvolvimento: `npm run dev`

2. **Testes**

   - Execute os testes unitários: `npm run test`
   - Execute os testes E2E: `npm run cypress:open`

3. **Build**
   - Execute o build: `npm run build`
   - Verifique o build: `npm run start`

## Convenções de Commits

- Use o formato: `tipo(escopo): descrição`
- Tipos: feat, fix, docs, style, refactor, test, chore
- Exemplo: `feat(auth): adiciona autenticação com JWT`

## Ambiente de Desenvolvimento

- Node.js >= 16.x
- npm >= 7.x
- PostgreSQL >= 13.x

## Suporte

Em caso de dúvidas, abra uma issue no GitHub ou entre em contato com a equipe de desenvolvimento.
