"use client";

import { UserRoundIcon } from "lucide-react";
import { Button } from "../Button";
import { InputText } from "../InputText";
import Link from "next/link";
import { useActionState } from "react";
import { createUserAction } from "@/actions/user/createUserAction";
import { PublicUserSchema } from "@/lib/user/schemas";

const initialState = {
  user: PublicUserSchema.parse({}),
  errors: [],
  success: false,
};

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(
    createUserAction,
    initialState,
  );

  return (
    <form
      action={action}
      className="flex flex-col flex-1 gap-6"
    >
      <InputText
        type="text"
        labelText="Nome"
        name="name"
        placeholder="Seu nome"
        disabled={isPending}
        defaultValue={state.user.name}
        required
      />

      <InputText
        type="email"
        labelText="E-mail"
        name="email"
        placeholder="Seu e-mail"
        disabled={isPending}
        defaultValue={state.user.email}
        required
      />

      <InputText
        type="password"
        labelText="Senha"
        name="password"
        placeholder="Sua senha"
        disabled={isPending}
        required
      />

      <InputText
        type="password"
        labelText="Repetir senha"
        name="password2"
        placeholder="Sua senha novamente"
        disabled={isPending}
        required
      />

      <Button
        color="default"
        size="md"
        type="submit"
        className="mt-4"
        disabled={isPending}
      >
        <UserRoundIcon />
        {!isPending && "Criar conta"}
        {isPending && "Criando..."}
      </Button>

      <p className="text-sm/tight">
        Já tem conta? Entre{" "}
        <Link
          href="/login"
          className="text-blue-600"
        >
          aqui
        </Link>
      </p>
    </form>
  );
}
