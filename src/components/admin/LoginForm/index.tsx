"use client";

import { loginAction } from "@/actions/login/loginAction";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { LogInIcon } from "lucide-react";
import { useActionState } from "react";

export function LoginForm() {
  const initialState = {
    username: "",
    error: "",
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form
      action={action}
      className="flex flex-col flex-1 gap-6"
    >
      <InputText
        labelText="Usuário"
        name="username"
        placeholder="Seu nome de usuário"
        disabled={isPending}
        defaultValue={state.username}
      />
      <InputText
        type="password"
        labelText="Senha"
        name="password"
        placeholder="Sua senha"
        disabled={isPending}
      />
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

      {state.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}
