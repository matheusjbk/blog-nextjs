// Quando um server component é importado dentro de um client component, o Next.js automaticamente transforma o server component em um client component. É recomendado usar a diretiva "use client" para indicar que o componente é um client component, mesmo que ele seja importado dentro de um server component.
"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { useEffect } from "react";

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle="Internal Server Error"
      contentTitle="501"
      content="Ocorreu um erro no qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde."
    />
  );
}
