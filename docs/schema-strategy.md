# Estratégia de Schema Markup (Structured Data)

## Visão Geral

A utilização de Schema Markup (dados estruturados) é essencial para reforçar o SEO avançado do e-commerce da Tout Spécial. Essa técnica permite que mecanismos de busca entendam melhor o conteúdo das páginas, exibam rich snippets e destaquem produtos, categorias e informações institucionais nos resultados de pesquisa.

---

## Objetivos

* Melhorar a **indexação** e **compreensão semântica** das páginas.
* Exibir **rich snippets** (ex: estrelas de avaliação, preço, disponibilidade).
* Aumentar a **CTR orgânica** nas SERPs.
* Integrar com **Google Shopping**, **Google Merchant Center** e **Google Lens**.

---

## Tipos de Schema Utilizados

### 1. Página de Produto (`Product`)

Aplica-se em páginas individuais de produto. Inclui:

* Nome (`name`)
* Descrição (`description`)
* Preço (`offers > price`)
* Moeda (`offers > priceCurrency`)
* Disponibilidade (`offers > availability`)
* Marca (`brand`)
* Código EAN (`gtin13`)
* Condição (`itemCondition`)
* Imagens (`image`)
* URL (`url`)
* Avaliações (`aggregateRating` e `review`, se houver)
* Variações (quando aplicável, via `isVariantOf`)

### 2. Página de Categoria (`CollectionPage` + `ItemList` + `BreadcrumbList`)

Aplica-se às páginas de listagem. Inclui:

* Tipo de página (`@type: CollectionPage`)
* Lista de produtos renderizados na primeira carga (`ItemList`)
* Navegação hierárquica (`BreadcrumbList`)
* Canonical única da URL base da categoria
* Categoria representada via `about` ou `mainEntity`

### 3. Página Institucional (`WebPage`, `AboutPage`, `ContactPage`, `FAQPage`)

Aplica-se a páginas como “Quem Somos”, “Contato”, “Política de Trocas”.

* Tipo de conteúdo textual descritivo
* Entidade representada: `Organization`
* Pode incluir `FAQPage` quando pertinente

### 4. Dados Globais (`Organization` e `WebSite`)

* Apontam para identidade da marca e site principal.
* Incluem:

  * Nome, URL, logo, contatos, redes sociais
  * `sameAs` com links para Instagram, Facebook, etc.
  * `SearchAction` para busca interna com endpoint real:

    ```json
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.toutspecial.com.br/busca?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
    ```

---

## Implementação

* Schema será injetado via componente React com `next/head` ou via tag `<script type="application/ld+json">`.
* Schema será renderizado **dinamicamente** com base nos dados da página (SSR/SSG).
* Para bots conhecidos (ex: Googlebot), o HTML final conterá todos os dados inline, sem placeholders.
* Os dados serão extraídos das tabelas `products`, `brands`, `categories`, `reviews`, `site_settings`.

---

## Relacionamento com Paginação

* A página de categoria terá `ItemList` com os produtos exibidos **na primeira renderização**.
* Para bots, será renderizada a versão **completa** da lista (até o limite de 80 produtos).
* Rolagem infinita será invisível para bots.
* A rolagem infinita utiliza hash na URL no formato `#1`, `#2`, `#3`, ..., exclusivamente para navegação do usuário. Essa variação **não é interpretada por bots** e não afeta a canonical, que permanece única.
* Canonical única para a URL base (sem parâmetros `?page=` ou similares).
* Suporte opcional ao atributo `position` nos itens da lista.

---

## Observações Técnicas

* Usar preferencialmente Schema no formato **JSON-LD** (recomendado pelo Google).
* Evitar duplicações de `@type` na mesma página.
* Campos opcionais serão utilizados quando disponíveis (ex: `gtin13`, `aggregateRating`, `review`).
* Os dados no Schema devem ser **consistentes com os dados exibidos na interface** (ex: preço, disponibilidade, avaliações).
* Validações serão feitas com:

  * [Rich Results Test](https://search.google.com/test/rich-results)
  * [Schema.org Validator](https://validator.schema.org/)

---

## Futuras Expansões

* Adição de `Review` reais via sistema de avaliação do cliente.
* Suporte a `FAQPage` nas páginas de produto ou no blog.
* Schema para busca interna (`SearchAction`) conectado ao endpoint de busca.
* Schema para `BreadcrumbList` também nas páginas de produto.
* Marcação de vitrines especiais com `ItemList` e `hasPart` (ex: “Mais Vendidos”, “Ofertas da Semana”) com base em selos configuráveis.

---

## Conclusão

Com a adoção completa desta estratégia de Schema Markup, a Tout Spécial aumentará sua visibilidade orgânica, destaque nas buscas e autoridade semântica perante os mecanismos de busca. Esta prática é parte essencial da base de SEO técnico e será validada continuamente durante o desenvolvimento e após a publicação.

---

> Este documento está vinculado aos seguintes arquivos:
>
> * [`infra.md`](./infra.md)
> * [`modelagem.md`](./modelagem.md)
> * [`paginacao-estrategia.md`](./paginacao-estrategia.md)
> * [`frontend.md`](./frontend.md)
