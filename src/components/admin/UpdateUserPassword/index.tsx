"use client";

import { updateUserPasswordAction } from "@/actions/user/updateUserPasswordAction";
import { showMessage } from "@/adapters/showMessage";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { LockKeyholeIcon } from "lucide-react";
import { useActionState, useEffect } from "react";

export function UpdateUserPassword() {
  const [state, action, isPending] = useActionState(updateUserPasswordAction, {
    errors: [],
    success: false,
  });

  useEffect(() => {
    showMessage.dismiss();

    if (state.errors.length > 0)
      state.errors.forEach(error => showMessage.error(error));

    if (state.success)
      showMessage.success(
        "Senha atualizada com sucesso! Faça login novamente.",
      );
  }, [state]);

  return (
    <form
      action={action}
      className="flex-1 flex flex-col gap-6"
    >
      <InputText
        type="password"
        name="currentPassword"
        labelText="Senha antiga"
        placeholder="Sua senha antiga"
        disabled={isPending}
        defaultValue=""
      />

      <InputText
        type="password"
        name="newPassword"
        labelText="Nova senha"
        placeholder="Sua nova senha"
        disabled={isPending}
        defaultValue=""
      />

      <InputText
        type="password"
        name="newPassword2"
        labelText="Confirme a nova senha"
        placeholder="Confirme sua nova senha"
        disabled={isPending}
        defaultValue=""
      />

      <div className="flex items-center justify-center mt-4">
        <Button
          size="md"
          color="default"
          disabled={isPending}
          type="submit"
        >
          <LockKeyholeIcon />
          Atualizar Senha
        </Button>
      </div>
    </form>
  );
}
