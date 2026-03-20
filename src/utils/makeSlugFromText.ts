import slugify from "slugify";
import { generateRandomString } from "./generateRandomString";

export function makeSlugFromText(text: string) {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return `${slug}-${generateRandomString()}`;
}
