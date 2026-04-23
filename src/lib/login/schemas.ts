import z from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "E-mail inválido" }),
  password: z.string().trim().min(1, "Senha não pode estar vazia"),
});
