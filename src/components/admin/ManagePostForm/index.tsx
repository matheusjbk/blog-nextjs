"use client";

import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState("");

  return (
    <form className="mb-16">
      <div className="flex flex-col gap-6">
        <InputCheckbox labelText="Publicado" />

        <ImageUploader />

        <InputText
          labelText="Nome"
          placeholder="Digite o seu nome"
        />

        <InputText
          labelText="Sobrenome"
          placeholder="Digite o seu sobrenome"
        />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={false}
        />

        <div className="mt-4">
          <Button
            color="default"
            size="md"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
