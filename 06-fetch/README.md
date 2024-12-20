# Aula: Fetch no Next.js

Neste resumo, abordaremos como realizar fetch em componentes "server" e "client" no Next.js, destacando as diferenças de comportamento entre eles e as vantagens de cada abordagem.<br/><br/>

## Fetch no Servidor<br/><br/>

Podemos fazer fetch diretamente em componentes do servidor. Veja o exemplo de implementação:

### Componente da Home Page
```tsx
import ServerFetch from "@/components/server-fetch";

export default async function HomePage() {
  return (
    <main>
      <h1>My Home Page</h1>
      <ServerFetch />
    </main>
  );
}
```
<br/>

### Componente ServerFetch
```tsx
export default async function ServerFetch() {
  const response = await fetch("https://api.origamid.online/produtos");

  const data = await response.json();

  console.log(data);

  return (
    <div>
      <h1>Server Fetch</h1>
    </div>
  );
}
```
<br/>

### Observação
Por ser um componente do tipo servidor, o `console.log` não será exibido no navegador, mas sim no ambiente Node.js. Aqui está um exemplo da estrutura de resposta:

```json
[
  {
    "id": 10,
    "nome": "Notebook",
    "preco": 4500,
    "descricao": "Notebook com alta performance para jogos",
    "estoque": 10,
    "importado": 1
  },
  {
    "id": 9,
    "nome": "Smartphone",
    "preco": 2800,
    "descricao": "Smartphone de última geração",
    "estoque": 20,
    "importado": 1
  },
  {
    "id": 8,
    "nome": "Smartwatch",
    "preco": 1200,
    "descricao": "Relógio inteligente com diversas funcionalidades",
    "estoque": 30,
    "importado": 0
  }
]
```
<br/>

### Renderizando os Itens no Componente Server-Side
Abaixo está uma atualização para renderizar os itens no componente servidor:

```tsx
type Product = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: number;
};

export default async function ServerFetch() {
  const response = await fetch("https://api.origamid.online/produtos");

  const data = (await response.json()) as Product[];

  console.log(data);

  return (
    <div>
      <h1>Server Fetch</h1>
      <ul>
        {data.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.nome}</h2>
            <p>Preço: {product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <p>Descrição: {product.descricao}</p>
            <p>Estoque: {product.estoque}</p>
            <p>Importado: {product.importado === 1 ? "Sim" : "Não"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
<br/>

#### Observação Importante
Ao inspecionar a página, você verá os dados renderizados no HTML. Isso ocorre porque a criação da página é feita do lado do servidor.<br/><br/>

### Diferenças entre Server e Client Components<br/><br/>
- **Server Component**:
  - A página é renderizada no servidor e entregue pronta ao cliente.
  - O carregamento inicial pode não ser tão rápido, mas o cache agressivo do Next.js acelera as visitas subsequentes.
  - As informações da API podem não refletir mudanças até que o cache seja invalidado.
<br/>

## Fetch no Cliente<br/><br/>
Agora veremos como realizar fetch em um componente cliente.

### Componente ClientFetch
```tsx
"use client";

type Product = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: number;
};

import React, { useEffect } from "react";

export default function ClientFetch() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.origamid.online/produtos");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Client Fetch</h1>
      <ul>
        {data.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.nome}</h2>
            <p>Preço: {product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <p>Descrição: {product.descricao}</p>
            <p>Estoque: {product.estoque}</p>
            <p>Importado: {product.importado === 1 ? "Sim" : "Não"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
<br/>

### Diferenças e Observações
- **Client Component**:
  - O HTML inicial não contém os dados da API; eles são preenchidos dinamicamente pelo JavaScript.
  - Possui um carregamento inicial mais lento, especialmente após atualizações frequentes.<br/><br/>

### Conclusão<br/><br/>
- O **Server Component** tende a ser mais rápido após o primeiro carregamento, devido ao cache agressivo do Next.js.
- O **Client Component** é útil para dados que precisam ser constantemente atualizados.
- Para melhorar a eficiência, considere estratégias de invalidação ou atualização do cache em componentes do servidor.
