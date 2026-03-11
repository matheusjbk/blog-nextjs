import { PostModel } from "@/models/post/postModel";
import { PostRepository } from "./postRepository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";
import { simulateDelay } from "@/utils/simulateDelay";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json",
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await simulateDelay(SIMULATE_WAIT_IN_MS);

    const posts = await this.readFromDisk();
    return posts.filter(post => post.published);
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await simulateDelay(SIMULATE_WAIT_IN_MS);

    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }
}
