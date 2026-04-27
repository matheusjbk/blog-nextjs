"use client";

import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { InputText } from "@/components/InputText";
import { simulateDelay } from "@/utils/simulateDelay";
import { LockKeyholeIcon, UserPenIcon, UserRoundXIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export function UpdateUserForm() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const isElementDisabled = isTransitioning;

  function showDeleteAccountDialog(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsDialogVisible(true);

    startTransition(async () => {
      await simulateDelay(10000);
    });
  }

  function handleDeleteUserAccount() {}

  return (
    <>
      <form
        action=""
        className="flex flex-col flex-1 gap-6"
      >
        <InputText
          type="text"
          name="name"
          labelText="Nome"
          placeholder="Seu nome"
          disabled={isElementDisabled}
          defaultValue=""
        />
        <InputText
          type="text"
          name="email"
          labelText="Email"
          placeholder="Seu email"
          disabled={isElementDisabled}
          defaultValue=""
        />

        <div className="flex items-center justify-center mt-4">
          <Button
            size="md"
            color="default"
            disabled={isElementDisabled}
            type="submit"
          >
            <UserPenIcon /> Atualizar perfil
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
