Estratégia de Paginação para SEO e UX
Este documento define a estratégia de paginação adotada no novo e-commerce da Tout Spécial, conciliando performance, experiência do usuário e boas práticas de SEO técnico.

Objetivos
Evitar canibalização de palavras-chave entre páginas da mesma categoria.

Eliminar conteúdo duplicado causado por parâmetros de URL (?page=2, etc.).

Oferecer uma navegação fluida e sem fricção para o usuário final.

Maximizar a indexação de produtos pelos mecanismos de busca.

Unificar a estratégia de SEO com a modelagem de dados e a infraestrutura da plataforma.

Padronizar heading tags conforme boas práticas de SEO avançado.

Garantir imagens com alt otimizados, com fallback automático baseado no meta title.

Atualizar sitemaps XML automaticamente, via webhook, a cada novo produto ou categoria.

Estratégia Adotada

1. URL Única com Scroll Infinito
   As páginas de categoria utilizam scroll infinito, com hashes opcionais (#2, #3) apenas para marcação visual de progresso.

O carregamento de conteúdo adicional não modifica a URL base — o Google vê uma única página canônica.

Exemplo:

/vestidos-juvenis-para-festa (URL principal)

/vestidos-juvenis-para-festa#2 (navegação do usuário, ignorada por bots)

2. Renderização Otimizada para Bots
   O servidor detecta crawlers como Googlebot e Bingbot via User-Agent.

Para esses bots, a renderização é feita via SSR com carregamento antecipado de até 80 produtos, simulando a rolagem completa.

Benefícios:

Indexação completa da categoria em uma única URL.

Percepção de página rica e com alto volume de conteúdo.

3. Limites Parametrizáveis
   Público Limite por Página Tipo de Carregamento
   Usuário final 40 produtos Scroll infinito (dinâmico)
   Bots 80 produtos SSR (pré-renderizado no servidor)

Os limites são dinâmicos e configuráveis, podendo variar conforme campanha, sazonalidade ou tipo de categoria.

SEO Técnico
As páginas de categoria possuem canonical fixo, sempre apontando para a URL principal:

html
Copiar
Editar

<link rel="canonical" href="https://www.toutspecial.com.br/vestidos-juvenis-para-festa" />
Não se utiliza rel="next" ou rel="prev", pois a paginação é dinâmica.

Estrutura de heading padronizada:

<h1>: Nome da categoria (visível apenas para crawlers, oculto no layout).

<h2>: Subtítulos das descrições das categorias.

<h3>: Títulos dos produtos listados.

Imagens:

O atributo alt é gerado a partir do campo definido no painel.

Se ausente, aplica-se fallback com o meta-title do produto.

O sitemap XML é atualizado automaticamente via webhook sempre que um novo item ou categoria é criada.

Integração Técnica
Com modelagem.md
A modelagem prevê paginação por metadados (limit, offset, total) nas consultas de produtos.

Um campo derivado isBot decide o comportamento de SSR conforme o User-Agent.

APIs RESTful ou GraphQL entregam os dados com suporte à estrutura descrita.

Com infra.md
O frontend Next.js renderiza com SSR/SSG e suporta fallback com hidratação do scroll infinito.

Middleware no backend Node.js/Express faz a detecção de bots.

Redis pode ser usado para cachear produtos renderizados para bots, evitando reprocessamento.

Logs estruturados ajudam a monitorar acessos de crawlers e avaliar desempenho via Search Console.

Benefícios
SEO aprimorado: Toda a categoria é indexada sem diluição de autoridade entre múltiplas URLs.

Evita competição interna: Nenhuma página concorre com outra da mesma categoria.

Melhora na experiência do usuário: Navegação fluida e contínua.

Fácil manutenção e análise: Estrutura centralizada e previsível.

Considerações Finais
Esta estratégia depende de coordenação entre frontend e backend, renderização adaptada e testes contínuos com ferramentas como Google Search Console e Lighthouse. Está em conformidade com as diretrizes do Google para conteúdo dinâmico e totalmente integrada à modelagem de dados e infraestrutura do projeto.

Nota: Este documento deve ser consultado sempre que forem feitas alterações na renderização de categorias, estrutura de produto ou comportamento de paginação.
