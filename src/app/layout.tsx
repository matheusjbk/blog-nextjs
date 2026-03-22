import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessagesContainer } from "@/components/MessagesContainer";
import { CreatedPostToatListener } from "@/components/admin/CreatedPostToastListener";
import { Suspense } from "react";

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
      data-color-mode="light"
    >
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>

        <Suspense fallback={null}>
          <CreatedPostToatListener />
        </Suspense>
        <MessagesContainer />
      </body>
    </html>
  );
}
