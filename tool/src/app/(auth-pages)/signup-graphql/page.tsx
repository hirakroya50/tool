"use client";

import FetchUserInGraphQlByClientC from "./_auth-graphqlComponents/FetchUserInGraphQlByClientC";
import AuthGraphQlQueryInServerComponent from "./_auth-graphqlComponents/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "./_auth-graphqlComponents/AuthGrphqlByClientComponent";
import AuthGraphQlQueryByFetch from "./_auth-graphqlComponents/AuthGraphQlQueryByFetch";
import SignUpByGraphQLServer from "./_auth-graphqlComponents/SignUpByGraphQLServer";
import { useGetAllUser } from "~/hooks/signup-graphqlHooks/useGetAllUser";
import { UpdateUser } from "./_auth-graphqlComponents/UpdateUser";

const Page = () => {
  const { data, loading, refetch } = useGetAllUser();
  return (
    <div className="h-screen w-full p-6">
      {/* <AuthGraphQlQueryByFetch />
      <AuthGraphQlQueryInServerComponent />
      <AuthGrphqlByClientComponent /> */}

      <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-800 underline">
        Users Server Operation by GraphQL
      </h1>

      <p className="pb-2 text-xs italic">
        I have implemented CRUD operations using Prisma in a PostgreSQL database
        and built a GraphQL server in a NestJS backend. The backend efficiently
        handles database interactions, providing seamless data manipulation via
        GraphQL queries and mutations. I integrated this backend with a Next.js
        frontend, allowing users to perform create, read, update, and delete
        operations directly from the user interface. The solution ensures a
        smooth data flow between the frontend and backend, leveraging the power
        of GraphQL for optimized queries and Prisma for reliable database
        management. This project demonstrates my ability to develop a full-stack
        application with modern technologies, providing a robust and scalable
        solution for managing data in real-time.
      </p>

      <div className="flex gap-1">
        <SignUpByGraphQLServer refetchUserList={refetch} />

        <div className="w-[40%] grow rounded-2xl border bg-white p-4 py-10 shadow">
          <FetchUserInGraphQlByClientC
            data={data}
            loading={loading}
            refetchUserList={refetch}
          />
        </div>

        <UpdateUser refetchUserList={refetch} />
      </div>
    </div>
  );
};

export default Page;
