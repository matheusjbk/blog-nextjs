import { PostModel } from "@/models/post/postModel";

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  create(post: PostModel): Promise<PostModel>;
  update(
    id: string,
    newPostDate: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">,
  ): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
}
