import { PostModel } from "@/models/post/postModel";
import { PostRepository } from "./postRepository";
import { drizzleDb } from "@/db/drizzle";
import { logColor } from "@/utils/logColor";
import { simulateDelay } from "@/utils/simulateDelay";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";
import { eq } from "drizzle-orm";
import { postsTable } from "@/db/drizzle/schemas";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await simulateDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("findAllPublic", Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await simulateDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("findBySlugPublic", Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await simulateDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("findAll", Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await simulateDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("findById", Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async delete(post: PostModel): Promise<{ success: boolean }> {
    await simulateDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("delete", Date.now());

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, post.id));

    return { success: true };
  }
}
