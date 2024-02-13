"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

type Props = {
  postId: number;
};

export default function PostOptions({ postId }: Props) {
  const router = useRouter();

  const { mutate: deletePost } = api.post.deleteOne.useMutation({
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const handleDeleteConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    deletePost({ id: postId });
  };

  return (
    <div className="mx-auto my-6 flex gap-2">
      {/* <Button variant="outline">Edit</Button> */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" type="button">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleDeleteConfirm}>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
