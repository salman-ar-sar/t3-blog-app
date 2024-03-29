import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import PostOptions from "./post-options";

export default async function PostView({ params }: { params: { id: string } }) {
  const postId = Number(params.id);

  if (Number.isNaN(postId)) redirect("/");

  const post = await api.post.getOne.query({ id: postId });

  if (!post) redirect("/");

  const session = await getServerAuthSession();

  return (
    <section className="mx-auto my-10 grid w-full max-w-3xl gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.name}</h1>
        <div className="flex items-center justify-between gap-2 text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Posted on {new Date(post.createdAt).toDateString()}
          </p>
          <div className="flex items-center gap-1">
            <Avatar className="size-7">
              <AvatarImage src={post.user.image ?? ""} />
              <AvatarFallback>{post.user.name}</AvatarFallback>
            </Avatar>
            <p className="font-medium">{post.user.name}</p>
          </div>
        </div>
      </div>
      <article>
        {post.description.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
      {session ? <PostOptions postId={postId} /> : null}
    </section>
  );
}
