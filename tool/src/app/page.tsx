import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Link href={"/login"}>login</Link>
        <Link href={"/login-trpc"}>login-trpc</Link>
        <Link href={"/signup-graphql"}>signup-graphql</Link>
        <Link href={"/s3"}>s3</Link>
        <Link href={"/debouncing-throttling"}>debouncing-throttling</Link>
        <Link href={"/notification-service"}>notification-service</Link>
        <Link href={"/websocket"}>websocket</Link>
        <Link href={"/websocket2"}>websocket2</Link>
      </main>
    </HydrateClient>
  );
}
