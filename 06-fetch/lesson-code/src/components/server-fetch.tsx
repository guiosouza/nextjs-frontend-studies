
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

  const data = await response.json() as Product[];

  console.log(data);

  return (
    <div>
      <h1>Server Fetch</h1>
      <ul>
        {data.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.nome}</h2>
            <p>Preço: {product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <p> Descrição: {product.descricao}</p>
            <p>Estoque: {product.estoque}</p>
            <p>Importado: {product.importado === 1 ? "Sim" : "Não"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
