import { isUrlOrRelativePath } from "@/utils/isUrlOrRelativePath";
import sanitize from "sanitize-html";
import z from "zod";
import { PublicUserSchema } from "../user/schemas";

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Título deve conter, no mínimo, 3 caracteres.")
    .max(120, "Título deve conter, no máximo, 120 caracteres."),
  content: z
    .string()
    .trim()
    .min(3, "Conteúdo é obrigatório")
    .transform(value => sanitize(value)),
  author: z
    .string()
    .trim()
    .min(4, "O nome do autor deve conter, no mínimo, 4 caracteres.")
    .max(100, "O nome do autor deve conter, no máximo, 100 caracteres."),
  excerpt: z
    .string()
    .trim()
    .min(3, "Excerto deve conter, no mínimo, 3 caracteres.")
    .max(200, "Excerto deve conter, no máximo, 200 caracteres."),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: "URL da capa deve ser uma URL ou caminho para imagem",
  }),
  active: z
    .union([
      z.literal("on"),
      z.literal("true"),
      z.literal("false"),
      z.literal(true),
      z.literal(false),
      z.literal(undefined),
      z.literal(null),
    ])
    .default(false)
    .transform(value => value === "on" || value === "true" || value === true),
});

export const CreatePostForApiSchema = PostBaseSchema.omit({
  author: true,
}).extend({});

export const UpdatePostForApiSchema = PostBaseSchema.omit({
  author: true,
}).extend({});

export const PublicPostForApiSchema = PostBaseSchema.extend({
  id: z.string().default(""),
  slug: z.string().default(""),
  title: z.string().default(""),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  author: PublicUserSchema.optional().default({
    name: "",
    email: "",
  }),
  coverImageUrl: z.string().default(""),
  createdAt: z.string().default(""),
});

export type CreatePostForApiDto = z.infer<typeof CreatePostForApiSchema>;
export type UpdatePostForApiDto = z.infer<typeof UpdatePostForApiSchema>;
export type PublicPostForApiDto = z.infer<typeof PublicPostForApiSchema>;
