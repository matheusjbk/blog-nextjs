import { ZodError } from "zod";

export const getZodErrorMessages = <T>(error: ZodError<T>): string[] =>
  error.issues.map(issue => issue.message);
