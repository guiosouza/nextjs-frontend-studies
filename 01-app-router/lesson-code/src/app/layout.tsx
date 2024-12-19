import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/menu";

export const metadata: Metadata = {
  title: "Next App do Gui",
  description: "Criado por guiosouza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
