"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL_GRAPH_QL,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
