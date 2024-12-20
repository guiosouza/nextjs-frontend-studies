// import Width from "@/components/width";
import ClientFetch from "@/components/client-fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function Home() {
  return (
    <main>
      <h1>About page</h1>
      <ClientFetch />
    </main>
  );
}
