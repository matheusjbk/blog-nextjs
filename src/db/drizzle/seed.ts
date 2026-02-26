import { JsonPostRepository } from "@/repositories/post/jsonPostRepository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  await drizzleDb.delete(postsTable);
  await drizzleDb.insert(postsTable).values(posts);
})();
