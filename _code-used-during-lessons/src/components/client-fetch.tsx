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
            <p>
              Preço:{" "}
              {product.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p> Descrição: {product.descricao}</p>
            <p>Estoque: {product.estoque}</p>
            <p>Importado: {product.importado === 1 ? "Sim" : "Não"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
