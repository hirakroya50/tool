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

      <h1 className="mb-6 mt-4 text-center text-3xl font-extrabold text-gray-800 underline">
        Users Server Operation by GraphQL
      </h1>

      <div className="flex gap-1">
        <SignUpByGraphQLServer refetchUserList={refetch} />
        <FetchUserInGraphQlByClientC
          data={data}
          loading={loading}
          refetchUserList={refetch}
        />
        <UpdateUser refetchUserList={refetch} />
      </div>
    </div>
  );
};

export default Page;
