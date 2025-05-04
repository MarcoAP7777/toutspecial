# Serviços

Esta pasta contém as integrações com serviços externos e APIs.

## Estrutura

```
services/
├── api/            # Clientes HTTP e configurações de API
├── auth/           # Serviços de autenticação
├── cart/           # Serviços do carrinho
├── checkout/       # Serviços do checkout
├── product/        # Serviços de produtos
├── search/         # Serviços de busca
└── utils/          # Utilitários para serviços
```

## Convenções

- Use `camelCase` para nomes de funções
- Um serviço por arquivo
- Tipagem completa com TypeScript
- Documentação com JSDoc
- Tratamento de erros consistente
- Retry policies quando necessário
- Cache quando apropriado

## Exemplo de Serviço

```tsx
import axios from 'axios';
import { Product } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const productService = {
  async getProducts(params: GetProductsParams): Promise<Product[]> {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
      }
      throw error;
    }
  },
};
```

## Boas Práticas

1. **Separação**: Mantenha serviços independentes
2. **Configuração**: Centralize configurações de API
3. **Erros**: Trate erros de forma consistente
4. **Cache**: Implemente cache quando apropriado
5. **Retry**: Use retry policies para falhas temporárias
6. **Logs**: Registre erros e operações importantes
