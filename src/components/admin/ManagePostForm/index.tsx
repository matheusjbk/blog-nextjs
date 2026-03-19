"use client";

import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { PostDto } from "@/dto/post/postDto";

type ManagePostFormProps = {
  postDto?: PostDto;
};

export function ManagePostForm({ postDto }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(postDto?.content || "");

  return (
    <form className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="ID do post (gerado automaticamente)"
          type="text"
          defaultValue={postDto?.id || ""}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug do post (gerado automaticamente)"
          type="text"
          defaultValue={postDto?.slug || ""}
          readOnly
        />

        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          defaultValue={postDto?.author || ""}
        />

        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título do post"
          type="text"
          defaultValue={postDto?.title || ""}
        />

        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo do post"
          type="text"
          defaultValue={postDto?.excerpt || ""}
        />

        <ImageUploader />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={false}
        />

        <InputText
          labelText="URL da imagem de capa"
          name="coverImageUrl"
          placeholder="Digite a URL da imagem de capa"
          type="text"
          defaultValue={postDto?.coverImageUrl || ""}
        />

        <InputCheckbox
          labelText="Publicar post"
          defaultChecked={postDto?.published}
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
