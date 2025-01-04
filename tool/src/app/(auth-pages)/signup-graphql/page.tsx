"use client";
import FetchUserInGraphQlByClientC from "~/app/(protected-service)/_components/auth-graphqlComonents/FetchUserInGraphQlByClientC";
import AuthGraphQlQueryByFetch from "~/app/(protected-service)/_components/auth-graphqlComonents/AuthGraphQlQueryByFetch";
import AuthGraphQlQueryInServerComponent from "~/app/(protected-service)/_components/auth-graphqlComonents/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "~/app/(protected-service)/_components/auth-graphqlComonents/AuthGrphqlByClientComponent";
import SignUpByGraphQLServer from "~/app/(protected-service)/_components/auth-graphqlComonents/SignUpByGraphQLServer";
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
