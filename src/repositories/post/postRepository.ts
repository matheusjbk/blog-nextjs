import { PostModel } from "@/models/post/postModel";

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  create(post: PostModel): Promise<{ success: boolean }>;
  delete(post: PostModel): Promise<{ success: boolean }>;
}
