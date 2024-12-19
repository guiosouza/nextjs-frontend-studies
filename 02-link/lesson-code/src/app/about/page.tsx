import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function Home() {
  return (
    <main>
      <h1>About page</h1>
      <h2 style={{ margin: "1600px 0" }} id="empresa">
        Empresa
      </h2>
    </main>
  );
}
