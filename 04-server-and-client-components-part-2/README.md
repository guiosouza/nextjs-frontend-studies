# NEXT.js - Server e Client Components: Parte 2

## Introdução
Neste estudo, exploramos os conceitos de **componentes do lado do servidor** (Server Components) e **componentes do lado do cliente** (Client Components) no NEXT.js. Esses conceitos são essenciais para criar aplicações performáticas e bem estruturadas. Vamos analisar boas práticas, exemplos de código e situações onde cada abordagem é aplicável.

---

## Componentes Dentro de Componentes
Uma boa prática é manter a página principal como um **Server Component** (o padrão do NEXT.js). Caso um componente dentro desta página precise de interatividade, ele deve ser um **Client Component**, utilizando `"use client"`.

Exemplo:

```jsx
// Página principal (Server Component por padrão)
import LastAcess from "@/components/last-acess";
import Width from "@/components/width";

export default async function HomePage() {
  return (
    <main>
      <h1>My Home Page</h1>
      <LastAcess /> {/* Componente do tipo servidor */}
      <Width /> {/* Componente do tipo cliente */}
    </main>
  );
}
```

### Observação:
- **Sem `"use client"`:** A página consegue combinar componentes do lado do servidor e do cliente.
- **Com `"use client"`:** Isso geraria erro ao tentar incluir um componente do lado do servidor, como `<LastAcess />`.

---

## Pré-Renderização no NEXT.js
O NEXT.js pré-renderiza componentes no servidor, enviando informações prontas para o cliente (navegador). Diferente do React puro, onde tudo é renderizado no navegador via JavaScript (se o JS estiver desabilitado, nada é exibido), o NEXT.js otimiza a experiência do usuário.

Porém, isso requer cuidado ao acessar APIs do navegador (como `window`, `document`, ou `localStorage`) em Server Components, porque essas APIs não estão disponíveis no servidor.

### Dica Importante:
Se você precisar de interatividade dentro de um Server Component (por exemplo, um Client Component dentro de um Server Component), **use o `useEffect`** para lidar com APIs do navegador, garantindo que elas sejam executadas apenas no cliente.

---

## Desabilitando a Pré-Renderização

Quando você precisa acessar APIs do navegador imediatamente, é necessário desabilitar a pré-renderização no servidor.

Exemplo:

```jsx
// Caso onde o "Width" precisa acessar window.innerWidth
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

// Import dinâmico com SSR desativado
const Width = dynamic(() => import('@/components/width'), { ssr: false });

export default function Home() {
  return (
    <main>
      <h1>About page</h1>
      <Width /> {/* Não pré-renderizado no servidor */}
      <h2 style={{ margin: "1600px 0" }} id="empresa">
        Empresa
      </h2>
    </main>
  );
}
```

### Contexto:
No exemplo acima, desativamos a pré-renderização no servidor para o componente `<Width />`. Isso é útil quando:
- Queremos acessar o `localStorage` ou outra API do navegador imediatamente.
- Precisamos lidar com valores dinâmicos, como `window.innerWidth`.

Código alternativo para o componente `Width`:

```jsx
import { useEffect, useState } from "react";

export default function Width() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth); // Executado apenas no cliente
  }, []);

  return <div>Width: {width}px</div>;
}
```

Com isso, o `Width` é renderizado corretamente no cliente, sem erros no servidor.

---

## Conclusão
- Mantenha as páginas principais como Server Components sempre que possível.
- Use Client Components apenas para partes interativas.
- Utilize `dynamic` com `ssr: false` para desativar a pré-renderização quando necessário.
- Sempre tenha em mente o comportamento de APIs do navegador no servidor e cliente.

Obrigado pela leitura! Até a próxima, **my guys!**

