import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "The Blog - Um blog criado com Next.js",
    template: "%s | The Blog",
  },
  description: "Descrição da página",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className=""
    >
      <body>
        <Container>
          <Header />

          {children}

          <footer className="text-6xl font-bold py-4 text-center">
            FOOTER
          </footer>
        </Container>
      </body>
    </html>
  );
}
