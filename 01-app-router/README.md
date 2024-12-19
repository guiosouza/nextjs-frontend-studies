# Next App Router - Guia de Demonstração

Este repositório contém exemplos práticos sobre como utilizar o **App Router** introduzido a partir do Next.js 13. Abaixo, está descrito o que foi demonstrado e como as funcionalidades foram implementadas.

---

## Estrutura de Rotas no App Router

No **Next.js 13**, é possível criar rotas ao adicionar pastas dentro do diretório `app`. Cada pasta representa uma rota, e o arquivo `page.tsx` dentro dela define o conteúdo dessa rota.

### Exemplo:

Criamos uma pasta chamada `sobre` dentro de `app`. O arquivo `page.tsx` dentro desta pasta define a página que será exibida em `/sobre`.

**Código do arquivo `app/sobre/page.tsx`:**

```tsx
export default function Home() {
  return (
    <main>
      <h1>About page</h1>
    </main>
  );
}
```

Quando acessamos `/sobre`, o conteúdo da página será:

```
About page
```

---

## Uso de `layout.tsx`

O arquivo `layout.tsx` no diretório `app` é usado para definir elementos persistentes em todas as páginas do site. Ele recebe o `children` como prop, que representa o conteúdo dinâmico das páginas.

### Exemplo:

O arquivo `app/layout.tsx` inclui um componente de menu que é exibido em todas as páginas do aplicativo.

**Código do arquivo `app/layout.tsx`:**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/menu";

export const metadata: Metadata = {
  title: "Origamid Next",
  description: "Criado por Origamid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
```

### Menu Persistente

O menu usado no `layout.tsx` é implementado como um componente separado e aparece em todas as páginas.

**Código do arquivo `components/menu.tsx`:**

```tsx
export default function Menu() {
  return (
    <ul className="menu">
      <li>
        <a href="/">Home </a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
  );
}
```

---

## Adicionando Metadados Personalizados

No App Router, você pode definir metadados específicos para cada página usando a exportação `metadata`.

### Exemplo:

No arquivo `app/sobre/page.tsx`, adicionamos um título e uma descrição exclusivos para a página “About”.

**Código do arquivo `app/sobre/page.tsx`:**

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function Home() {
  return (
    <main>
      <h1>About page</h1>
    </main>
  );
}
```

Quando acessamos `/sobre`, o título da página é definido como “About”, e a descrição é configurada para “About page”.

---

## Conclusão

Este repositório demonstra como utilizar:
- A estrutura de rotas do App Router.
- O arquivo `layout.tsx` para elementos persistentes.
- Metadados personalizados em páginas individuais.

Sinta-se à vontade para explorar e modificar o código para entender melhor o funcionamento do Next.js 13.

