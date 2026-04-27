"use client";

import { loginAction } from "@/actions/login/loginAction";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { HoneypotInput } from "../HoneypotInput";

export function LoginForm() {
  const initialState = {
    email: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form
      action={action}
      className="flex flex-col flex-1 gap-6"
    >
      <InputText
        type="email"
        labelText="E-mail"
        name="email"
        placeholder="Seu e-mail"
        disabled={isPending}
        defaultValue={state.email}
        required
      />

      <InputText
        type="password"
        labelText="Senha"
        name="password"
        placeholder="Sua senha"
        disabled={isPending}
      />

      <HoneypotInput />

      <Button
        color="default"
        size="md"
        type="submit"
        className="mt-4"
        disabled={isPending}
      >
        <LogInIcon />
        Entrar
      </Button>

      {state.errors &&
        state.errors.map(error => (
          <p
            key={error}
            className="text-red-600"
          >
            {error}
          </p>
        ))}

      <p className="text-sm/tight">
        Não tem conta? crie uma{" "}
        <Link
          href="/user/new"
          className="text-blue-600"
        >
          aqui
        </Link>
      </p>
    </form>
  );
}
