import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export async function PostList() {
  const session = await getServerAuthSession();
  const posts = await api.post.getAll.query();

  return (
    <div className="flex w-screen flex-col divide-y divide-gray-200">
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">All Posts</h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Click on a post to read more
          </p>
        </div>
        <div className="space-y-1.5">
          {session ? (
            <Link href="/create-post">
              <Button>New Post</Button>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-6">
        {posts.map((post) => (
          <Link
            className="space-y-1 rounded-md p-4 hover:bg-primary-foreground/5"
            href={`/post/${post.id}`}
            key={post.id}
          >
            <h2 className="text-lg font-semibold tracking-tight">
              {post.name}
            </h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Posted on {new Date(post.createdAt).toDateString()}
            </p>
            <p className="line-clamp-3">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
