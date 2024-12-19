// a component that shows the width of the window of the browser
"use client";
import { useEffect, useState } from "react";

export default function Width() {
  const [width, setWidth] = useState(0);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h2>Largura: {width}</h2>
      {/* botão muda de cor e a palavra de dependendo do estado de ativação */}
      <button
        onClick={() => setAtivo(!ativo)}
        style={{ backgroundColor: ativo ? "red" : "blue", color: "white" }}
      >
        {ativo ? "Desativar" : "Ativar"}
      </button>
    </div>
  );
}
