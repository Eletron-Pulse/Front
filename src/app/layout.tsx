import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Elotron Pulse",
  description: "Site de venda de eletreônicos",
  keywords: ["Venda", "Notebook", "Smartphone", "Eletrônicos", "Site de vendas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
