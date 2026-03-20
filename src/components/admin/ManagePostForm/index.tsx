"use client";

import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPostDto, PostDto } from "@/dto/post/postDto";
import { createPostAction } from "@/actions/post/createPostAction";
import { showMessage } from "@/adapters/showMessage";

type ManagePostFormProps = {
  postDto?: PostDto;
};

export function ManagePostForm({ postDto }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPostDto(postDto),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  const { formState } = state;

  const [contentValue, setContentValue] = useState(formState.content);

  useEffect(() => {
    showMessage.dismiss();

    if (state.errors.length > 0)
      state.errors.forEach(error => showMessage.error(error));
  }, [state.errors]);

  return (
    <form
      action={action}
      className="mb-16"
    >
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="ID do post (gerado automaticamente)"
          type="text"
          defaultValue={formState.id}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug do post (gerado automaticamente)"
          type="text"
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          defaultValue={formState.author}
        />

        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título do post"
          type="text"
          defaultValue={formState.title}
        />

        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo do post"
          type="text"
          defaultValue={formState.excerpt}
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
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publicar post"
          name="published"
          defaultChecked={formState.published}
        />

        <div className="mt-4">
          <Button
            color="default"
            size="md"
            type="submit"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
