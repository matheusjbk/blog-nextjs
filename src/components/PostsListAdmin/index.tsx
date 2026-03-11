import { findAllPostsAdmin } from "@/lib/queries/admin";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

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

            <button
              className="text-red-500 cursor-pointer [&_svg]:w-6 [&_svg]:h-6 transition hover:scale-120 hover:text-red-700"
              aria-label={`Apagar o post: ${post.title}`}
              title={`Apagar o post: ${post.title}`}
            >
              <Trash2Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
