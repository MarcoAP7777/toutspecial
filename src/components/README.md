# Componentes

Esta pasta contém todos os componentes React reutilizáveis do projeto.

## Estrutura

```
components/
├── common/         # Componentes básicos (Button, Input, etc)
├── layout/         # Componentes de layout (Header, Footer, etc)
├── product/        # Componentes relacionados a produtos
├── cart/           # Componentes do carrinho
├── checkout/       # Componentes do checkout
├── admin/          # Componentes do painel administrativo
└── ui/             # Componentes de interface (modais, toasts, etc)
```

## Convenções

- Use `PascalCase` para nomes de componentes
- Um componente por arquivo
- Tipagem completa com TypeScript
- Documentação com JSDoc
- Testes unitários para cada componente
- Estilos com Tailwind CSS
- Props tipadas e documentadas

## Exemplo de Componente

```tsx
import { FC } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

## Boas Práticas

1. **Composição**: Prefira composição a herança
2. **Props**: Mantenha as props mínimas e necessárias
3. **Performance**: Use `memo` quando necessário
4. **Acessibilidade**: Implemente ARIA attributes
5. **Responsividade**: Use classes Tailwind responsivas
6. **Testes**: Cobertura mínima de 80%
