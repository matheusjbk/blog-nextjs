"use client";

import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, use, useEffect, useState, useRef } from "react";
import { ImageUploader } from "../ImageUploader";
import { createPostAction } from "@/actions/post/createPostAction";
import { showMessage } from "@/adapters/showMessage";
import { updatePostAction } from "@/actions/post/updatePostAction";
import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from "@/lib/post/schemas";

type ManageCreatePostFormProps = {
  mode: "create";
};

type ManageUpdatePostFormProps = {
  mode: "update";
  postDto?: PublicPostForApiDto | Promise<PublicPostForApiDto>;
};

type ManagePostFormProps =
  | ManageCreatePostFormProps
  | ManageUpdatePostFormProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  let postDtoProp:
    | PublicPostForApiDto
    | Promise<PublicPostForApiDto>
    | undefined = undefined;
  if (mode === "update") postDtoProp = props.postDto;

  let resolvedPostDto: PublicPostForApiDto | undefined = undefined;
  if (mode === "update" && postDtoProp) {
    if (
      typeof (postDtoProp as PromiseLike<PublicPostForApiDto>).then ===
      "function"
    ) {
      resolvedPostDto = use(postDtoProp as Promise<PublicPostForApiDto>);
    } else {
      resolvedPostDto = postDtoProp as PublicPostForApiDto;
    }
  }

  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  };

  const initialState = {
    formState: PublicPostForApiSchema.parse(resolvedPostDto || {}),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  const { formState } = state;

  const [contentValue, setContentValue] = useState(formState.content);

  useEffect(() => {
    showMessage.dismiss();

    if (state.errors.length > 0)
      state.errors.forEach(error => showMessage.error(error));
  }, [state.errors]);

  const shownSuccessId = useRef<string | null>(null);

  useEffect(() => {
    if (state.success && state.success !== shownSuccessId.current) {
      showMessage.dismiss();
      showMessage.success("Post atualizado com sucesso");
      shownSuccessId.current = state.success;
    }
  }, [state.success]);

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
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título do post"
          type="text"
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo do post"
          type="text"
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={isPending}
        />

        <InputText
          labelText="URL da imagem de capa"
          name="coverImageUrl"
          placeholder="Digite a URL da imagem de capa"
          type="text"
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText="Publicar post"
          name="active"
          defaultChecked={formState.active}
          disabled={isPending}
        />

        <div className="mt-4">
          <Button
            color="default"
            size="md"
            type="submit"
            disabled={isPending}
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
