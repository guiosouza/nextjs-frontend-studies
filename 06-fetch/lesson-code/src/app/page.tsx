import ServerFetch from "@/components/server-fetch";

export default async function HomePage() {
  return (
    <main>
      <h1>My Home Page</h1>
      <ServerFetch />
    </main>
  );
}
