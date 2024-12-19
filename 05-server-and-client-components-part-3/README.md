# Server e Client Components - Parte 3

Este repositório contém um estudo sobre componentes do lado do servidor e do lado do cliente utilizando **Next.js**. O objetivo é criar uma aplicação que calcula a **Frequência Cardíaca Ideal** com base na idade e no objetivo de treino.

---

## 🚀 Exercício: Cálculo de Frequência Cardíaca Ideal

### 🌟 Descrição

Crie uma rota `/frequencia-ideal` que calcula a frequência cardíaca ideal para diferentes intensidades de treino. O exercício explora conceitos de componentes do lado do servidor e cliente.

### 🧮 Fórmulas Utilizadas

1. **Frequência Cardíaca Máxima (FCmáx)**:
   ```
   FCmáx = 220 - idade
   ```
2. **Faixas de Intensidade de Treino**:
   - **Leve**: 50% - 70% da FCmáx
   - **Moderado**: 70% - 80% da FCmáx
   - **Intenso**: 75% - 85% da FCmáx

### 📥 Entrada

- **Idade** (inteiro positivo)
- **Intensidade de treino**: "leve", "moderado" ou "alto"

### 📤 Saída

- Faixa de frequência cardíaca recomendada, por exemplo: `Entre 100 e 140 batimentos por minuto`

### 🔗 Rota para a Página

A rota deve ser acessada em: [`/frequencia-ideal`](http://localhost:3000/frequencia-ideal).

---

## 🛠️ Implementação

### Componente Cliente

O componente do lado do cliente é responsável por gerenciar os inputs do usuário (idade e intensidade de treino) e calcular a faixa ideal de frequência cardíaca.

```javascript
"use client";
import React from "react";

function IdealHeartRate() {
  const [age, setAge] = React.useState(0);
  const [intensity, setIntensity] = React.useState("leve");
  const [idealHeartRateRange, setIdealHeartRate] = React.useState("0 e 0");

  const maxHeartRateRage = React.useMemo(() => 220 - age, [age]);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0) {
      setAge(value);
    }
  };

  const handleIntensityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntensity(event.target.value);
  };

  const handleCalculateIdealHeartRate = () => {
    if (age <= 0) return;

    let minHeartRate = 0;
    let maxHeartRate = 0;

    if (intensity === "leve") {
      minHeartRate = maxHeartRateRage * 0.5;
      maxHeartRate = maxHeartRateRage * 0.7;
    } else if (intensity === "moderado") {
      minHeartRate = maxHeartRateRage * 0.7;
      maxHeartRate = maxHeartRateRage * 0.8;
    } else if (intensity === "alto") {
      minHeartRate = maxHeartRateRage * 0.75;
      maxHeartRate = maxHeartRateRage * 0.85;
    }

    setIdealHeartRate(`${minHeartRate.toFixed(0)} e ${maxHeartRate.toFixed(0)}`);
  };

  return (
    <div>
      <label htmlFor="age-input">Idade</label>
      <input id="age-input" type="text" placeholder="Idade" onChange={handleAgeChange} />
      <label htmlFor="intensity-select">Intensidade</label>
      <select id="intensity-select" onChange={handleIntensityChange}>
        <option value="leve">Leve</option>
        <option value="moderado">Moderado</option>
        <option value="alto">Alto</option>
      </select>
      <button onClick={handleCalculateIdealHeartRate} disabled={age <= 0}>
        Calcular
      </button>
      <div>
        <h2>Resultado</h2>
        <p>
          {age > 0
            ? `Seu batimento cardíaco ideal é entre: ${idealHeartRateRange}`
            : "Por favor, insira uma idade válida."}
        </p>
      </div>
    </div>
  );
}

export default IdealHeartRate;
```

### Componente Pai (Servidor)

Este componente é responsável por renderizar o componente cliente e está localizado em `app/frequencia-ideal`.

```javascript
import IdealHeartRate from "@/components/ideal-heart-rate";
import React from "react";

function HeartRateCalc() {
  return (
    <div>
      <IdealHeartRate />
    </div>
  );
}

export default HeartRateCalc;
```

---

## 📂 Estrutura de Pastas

```
project-root/
├── app/
│   ├── frequencia-ideal/
│   │   ├── page.tsx
├── components/
│   ├── ideal-heart-rate.tsx
```

---

## Conclusão

Com este exercício, foi possível compreender como criar componentes que utilizam os conceitos de **Server Components** e **Client Components** no Next.js. Este projeto também demonstra como organizar e gerenciar rotas e estados em uma aplicação real.

---

## 📚 Referências

- [Documentação do Next.js](https://nextjs.org/docs)
- [Conceitos de Server e Client Components](https://nextjs.org/docs/getting-started/react-server-components)
