import LastAcess from "@/components/last-acess";
import Width from "@/components/width";

export default async function HomePage() {
  return (
    <main>
      <h1>My Home Page</h1>
      <LastAcess /> {/* componente tipo servidor */}
    </main>
  );
}
