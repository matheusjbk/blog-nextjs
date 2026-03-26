import { PostModel } from "@/models/post/postModel";
import { PostRepository } from "./postRepository";
import { drizzleDb } from "@/db/drizzle";
import { simulateDelay } from "@/utils/simulateDelay";
import { eq } from "drizzle-orm";
import { postsTable } from "@/db/drizzle/schemas";

const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await simulateDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await simulateDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await simulateDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await simulateDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    await simulateDelay(simulateWaitMs, true);

    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
    });

    if (postExists) throw new Error("ID ou Slug já existente na base de dados");

    await drizzleDb.insert(postsTable).values(post);

    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel> {
    await simulateDelay(simulateWaitMs, true);

    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) throw new Error("Post não encontrado");

    const updatedAt = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      title: newPostData.title,
      excerpt: newPostData.excerpt,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      published: newPostData.published,
      updatedAt,
    };

    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }

  async delete(id: string): Promise<PostModel> {
    await simulateDelay(simulateWaitMs, true);

    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!postExists) throw new Error("Post não encontrado");

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return postExists;
  }
}
