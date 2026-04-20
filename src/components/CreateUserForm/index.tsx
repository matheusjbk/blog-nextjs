"use client";

import { UserRoundIcon } from "lucide-react";
import { Button } from "../Button";
import { InputText } from "../InputText";
import Link from "next/link";

export function CreateUserForm() {
  return (
    <form
      action={""}
      className="flex flex-col flex-1 gap-6"
    >
      <InputText
        type="text"
        labelText="Nome"
        name="name"
        placeholder="Seu nome"
        disabled={false}
        defaultValue={""}
        required
      />

      <InputText
        type="email"
        labelText="E-mail"
        name="email"
        placeholder="Seu e-mail"
        disabled={false}
        defaultValue={""}
        required
      />

      <InputText
        type="password"
        labelText="Senha"
        name="password"
        placeholder="Sua senha"
        disabled={false}
        required
      />

      <InputText
        type="password"
        labelText="Repetir senha"
        name="password2"
        placeholder="Sua senha novamente"
        disabled={false}
        required
      />

      <Button
        color="default"
        size="md"
        type="submit"
        className="mt-4"
        disabled={false}
      >
        <UserRoundIcon />
        Criar conta
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
