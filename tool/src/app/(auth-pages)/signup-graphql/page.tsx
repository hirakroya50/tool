"use client";

import FetchUserInGraphQlByClientC from "./_auth-graphqlComponents/FetchUserInGraphQlByClientC";
import AuthGraphQlQueryInServerComponent from "./_auth-graphqlComponents/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "./_auth-graphqlComponents/AuthGrphqlByClientComponent";
import AuthGraphQlQueryByFetch from "./_auth-graphqlComponents/AuthGraphQlQueryByFetch";
import SignUpByGraphQLServer from "./_auth-graphqlComponents/SignUpByGraphQLServer";
import { useGetAllUser } from "~/hooks/signup-graphqlHooks/useGetAllUser";

const Page = () => {
  const { data, loading, refetch } = useGetAllUser();
  return (
    <div>
      <FetchUserInGraphQlByClientC
        data={data}
        loading={loading}
        refetchUserList={refetch}
      />
      {/* <AuthGraphQlQueryByFetch />
      <AuthGraphQlQueryInServerComponent />
      <AuthGrphqlByClientComponent /> */}
      <SignUpByGraphQLServer refetchUserList={refetch} />
    </div>
  );
};

export default Page;
