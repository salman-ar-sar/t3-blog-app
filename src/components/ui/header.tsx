import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";

async function AuthLink() {
  const session = await getServerAuthSession();

  return (
    <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
      <Button variant="secondary">{session ? "Sign out" : "Sign in"}</Button>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/">
        <h1 className="text-xl font-semibold">T3 Blog</h1>
      </Link>
      <div className="flex items-center gap-2">
        <AuthLink />
        <ThemeToggle />
      </div>
    </header>
  );
}
