import { postRepository } from "@/repositories/post";
import { Post } from "../Post";

export async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => {
        return (
          <div
            className="group flex flex-col gap-4"
            key={post.id}
          >
            <Post
              post={post}
              headingType="h3"
            />
          </div>
        );
      })}
    </div>
  );
}
