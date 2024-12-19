# Server e Client Components no Next.js - Parte 1

Este documento serve como referência sobre o aprendizado relacionado a **Server Components** e **Client Components** no Next.js. Inclui explicações, exemplos práticos e boas práticas.

---
<br/>
<br/>
<br/>

## 📡 Server Components

Por padrão, no Next.js, todos os componentes são renderizados no lado do servidor (**Server Components**). Isso significa que eles podem acessar APIs do Node.js diretamente. 

### 🛠️ Características dos Server Components:
- Renderizados e executados no servidor.
- Permitem o uso de APIs do Node.js, como `fs` (filesystem).
- Podem ser assíncronos, permitindo o uso de `async` e `await`.
- Gera o HTML diretamente no servidor, reduzindo a necessidade de processamento no cliente.

### 💻 Exemplo de Server Component
Este componente registra o último acesso ao sistema em um arquivo e exibe o conteúdo do log na página:

```jsx
import React from "react";
import fs from "fs/promises";

async function LastAcess() {
  // Função para formatar a data e hora
  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const dateTime = getFormattedDate();

  // Cria um arquivo de log na raiz do projeto
  await fs.appendFile("log.txt", `${dateTime}\n`, "utf-8");

  // Lê o arquivo de log e exibe o conteúdo na página
  const log = await fs.readFile("log.txt", "utf-8");
  return (
    <div>
      <h2>Último acesso</h2>
      <p>{log}</p>
    </div>
  );
}

export default LastAcess;
```

Este componente pode ser utilizado em uma página assim:

```jsx
import LastAcess from "@/components/last-acess";

export default async function HomePage() {
  return (
    <main>
      <h1>My Home Page</h1>
      <LastAcess />
    </main>
  );
}
```

### 📝 Observação:
Ao inspecionar o HTML gerado no navegador, você verá que os dados já estão no documento HTML, sem a necessidade de processamento adicional no cliente.

---
<br/>
<br/>
<br/>

## 🌐 Client Components

Os Client Components são renderizados no lado do cliente e possuem acesso às APIs do navegador, como `window`. Também podem usar recursos como **hooks do React** (`useState`, `useEffect`, etc.).

### 🛠️ Características dos Client Components:
- Devem incluir a diretiva `'use client'` no início do arquivo.
- Podem ser pré-renderizados no servidor, mas a interatividade é adicionada no cliente.
- Recomendados para partes da aplicação que necessitam de interatividade.

### 💻 Exemplo de Client Component
Um componente simples que mostra a largura da janela do navegador e é atualizado em tempo real:

```jsx
'use client';
import { useEffect, useState } from "react";

export default function Width() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Width: {width}</div>;
}
```

### 🔄 Integrando com Server Components
Um Client Component pode ser importado e utilizado dentro de um Server Component:

```jsx
'use client';
import { useEffect, useState } from "react";

export default function InteractiveWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h2>Largura: {width}</h2>
      {/* Botão que muda de cor e estado ao ser clicado */}
      <button
        onClick={() => setAtivo(!ativo)}
        style={{ backgroundColor: ativo ? "red" : "blue", color: "white" }}
      >
        {ativo ? "Desativar" : "Ativar"}
      </button>
    </div>
  );
}
```

### ✅ Boas Práticas:
- **Separe interatividade em Client Components:** 
  Use `'use client'` para componentes que dependem de hooks ou de APIs do navegador.
- **Combine Server e Client Components:**
  Coloque a lógica do cliente em um componente separado e importe-o em um componente do servidor.

---
<br/>
<br/>
<br/>

## 📋 Resumo

| Tipo de Componente   | Renderizado em    | Acesso a APIs                  | Exemplos de Uso                       |
|----------------------|-------------------|--------------------------------|---------------------------------------|
| **Server Component** | Servidor          | APIs do Node.js, assíncronas   | Lógica pesada, acesso a banco de dados |
| **Client Component** | Navegador         | `window`, hooks do React      | Interatividade, manipulação do DOM    |

Usar o Next.js de forma eficiente significa entender quando usar cada tipo de componente e como combiná-los para obter o melhor desempenho e experiência para o usuário.

---

Esperamos que este documento seja útil como referência para o uso de Server e Client Components no Next.js.
