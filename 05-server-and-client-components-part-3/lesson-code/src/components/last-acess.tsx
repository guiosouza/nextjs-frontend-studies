import React from "react";
import fs from "fs/promises";

async function LastAcess() {
  // Função para obter a data e hora no formato desejado
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

  // criamos um arquivo de log na raiz do projeto
  await fs.appendFile("log.txt", `${dateTime}\n`, "utf-8");

  // vamos ler o arquivo de log e exibir o conteúdo na página
  const log = await fs.readFile("log.txt", "utf-8");
  
  return (
    <div>
      <h2>Último acesso</h2>
      <p>{log}</p>
    </div>
  );
}

export default LastAcess;
