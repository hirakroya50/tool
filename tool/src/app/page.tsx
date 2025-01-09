import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <section className="mb-8 rounded-lg bg-[#1e1e2f] bg-opacity-80 p-6 text-center shadow-xl">
          <h1 className="bg-cdivp-text mb-6 text-4xl font-extrabold leading-tight text-white underline">
            Welcome to My Personal Project
          </h1>
          <p className="mb-4 font-medium leading-relaxed">
            This is a full-stack application with a variety of integrated
            features like authentication, rate liming, file storage, and
            real-time communication. The backend is built using NestJS
            microservices, while the frontend is built with Next.js.
          </p>
          <p className="mb-4 font-medium leading-relaxed">
            Explore and test the various functionalities like login, signup,
            GraphQL integration, WebSocket communication, and more. You can also
            interact with AWS S3 for file CRUD operations and experiment with
            features like debouncing, throttling, and notifications.
          </p>
        </section>

        <section className="space-y-8 px-6 text-center">
          <h2 className="text-gradient mb-6 text-3xl font-semibold">
            Features to Explore:
          </h2>
          <div className="flex flex-wrap gap-1 text-lg">
            {[
              { href: "/login", label: "Login" },
              { href: "/login-trpc", label: "Login with TRPC" },
              { href: "/signup-graphql", label: "Signup with GraphQL" },
              { href: "/s3", label: "AWS S3 CRUD Operations" },
              {
                href: "/debouncing-throttling",
                label: "Debouncing and Throttling",
              },
              { href: "/notification-service", label: "Notification Service" },
              { href: "/websocket", label: "WebSocket Chat" },
              { href: "/serverless", label: "serverless backend" },
            ].map((item, index) => (
              <Link
                href={item.href}
                className="m-0 rounded-lg border p-2 transition-colors duration-300 hover:bg-[#2d2f4d] hover:text-pink-500"
                key={index}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
