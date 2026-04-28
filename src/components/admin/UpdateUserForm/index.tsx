"use client";

import { updateUserAction } from "@/actions/user/updateUserAction";
import { showMessage } from "@/adapters/showMessage";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { InputText } from "@/components/InputText";
import { PublicUserDto } from "@/lib/user/schemas";
import { simulateDelay } from "@/utils/simulateDelay";
import {
  LockKeyholeIcon,
  UserRoundPenIcon,
  UserRoundXIcon,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState, useTransition } from "react";

type UpdateUserFormProps = {
  user: PublicUserDto;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [state, action, isPending] = useActionState(updateUserAction, {
    user,
    errors: [],
    success: false,
  });
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const isElementDisabled = isTransitioning || isPending;

  function showDeleteAccountDialog(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsDialogVisible(true);

    startTransition(async () => {
      await simulateDelay(10000);
    });
  }

  useEffect(() => {
    showMessage.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => showMessage.error(error));
    }

    if (state.success) {
      showMessage.success("Perfil atualizado com sucesso!");
    }
  }, [state]);

  function handleDeleteUserAccount() {}

  return (
    <>
      <form
        action={action}
        className="flex flex-col flex-1 gap-6"
      >
        <InputText
          type="text"
          name="name"
          labelText="Nome"
          placeholder="Seu nome"
          disabled={isElementDisabled}
          defaultValue={state.user.name}
        />
        <InputText
          type="text"
          name="email"
          labelText="Email"
          placeholder="Seu email"
          disabled={isElementDisabled}
          defaultValue={state.user.email}
        />

        <div className="flex items-center justify-center mt-4">
          <Button
            size="md"
            color="default"
            disabled={isElementDisabled}
            type="submit"
          >
            <UserRoundPenIcon /> Atualizar perfil
          </Button>
        </div>

        <div className="flex gap-4 items-center justify-between mt-8">
          <Link
            href="/admin/user/password"
            className="flex gap-2 items-center justify-center transition hover:text-blue-600"
          >
            <LockKeyholeIcon /> Alterar Senha
          </Link>

          <Link
            href="#"
            className="flex gap-2 items-center justify-center transition text-red-600 hover:text-red-800"
            onClick={showDeleteAccountDialog}
          >
            <UserRoundXIcon /> Apagar conta
          </Link>
        </div>
      </form>

      <Dialog
        content={
          <p>
            Ao apagar sua conta, seus dados e todos os seus posts também serão
            excluídos. Essa ação é irreversível. Clique em <b>OK</b> para
            confirmar ou em <b>Cancelar</b> para fechar essa janela. Em alguns
            segundos os botões serão liberados.
          </p>
        }
        disabled={isElementDisabled}
        onCancel={() => setIsDialogVisible(false)}
        onConfirm={handleDeleteUserAccount}
        title="Apagar minha conta"
        isVisible={isDialogVisible}
      />
    </>
  );
}
