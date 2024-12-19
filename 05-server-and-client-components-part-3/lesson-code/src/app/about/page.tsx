// import Width from "@/components/width";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

const Width = dynamic(() => import('@/components/width'), {ssr: false});

export default function Home() {
  return (
    <main>
      <h1>About page</h1>
      <Width />
      <h2 style={{ margin: "1600px 0" }} id="empresa">
        Empresa
      </h2>
    </main>
  );
}
