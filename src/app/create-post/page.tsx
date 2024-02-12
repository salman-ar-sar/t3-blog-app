"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Post name must be at least 1 character.",
    })
    .max(256, {
      message: "Post name must be less than 256 characters.",
    }),
  description: z
    .string()
    .min(1, {
      message: "Post description must be at least 1 character.",
    })
    .max(1024, {
      message: "Post description must be less than 1024 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function CreatePost() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: createPost, isLoading } = api.post.create.useMutation({
    onSuccess: async () => {
      router.back();
      router.refresh();
    },
  });

  function onSubmit(values: FormData) {
    createPost(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 md:p-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Lorem Ipsum" {...field} />
              </FormControl>
              <FormDescription>This is the post&apos;s name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This is lorem ipsum"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the post&apos;s description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading} className="w-20" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
