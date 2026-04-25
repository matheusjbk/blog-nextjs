import { findAllPostsFromApiAdmin } from "@/lib/queries/admin";
import Link from "next/link";
import { DeletePostButton } from "../DeletePostButton";
import { ErrorMessage } from "@/components/ErrorMessage";

export default async function PostsListAdmin() {
  const postsResponse = await findAllPostsFromApiAdmin();

  if (!postsResponse.success) {
    console.log(postsResponse.errors);

    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Tente fazer login novamente"
      />
    );
  }

  const posts = postsResponse.data;

  if (posts.length === 0)
    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Bora criar algum post?"
      />
    );

  return (
    <div className="mb-16">
      {posts.map(post => {
        return (
          <div
            className={`p-2 ${!post.active ? "bg-slate-300" : ""} flex gap-2 items-center justify-between`}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.active && (
              <span className="text-xs italic text-slate-600">
                (Não publicado)
              </span>
            )}

            <DeletePostButton
              id={post.id}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}
