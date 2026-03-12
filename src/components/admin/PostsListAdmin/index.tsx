import { findAllPostsAdmin } from "@/lib/queries/admin";
import Link from "next/link";
import { DeletePostButton } from "../DeletePostButton";
import { ErrorMessage } from "@/components/ErrorMessage";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

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
            className={`p-2 ${!post.published ? "bg-slate-300" : ""} flex gap-2 items-center justify-between`}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
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
