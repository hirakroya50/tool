"use client";
import FetchUserInGraphQlByClientC from "../_components/auth-graphqlComonents/FetchUserInGraphQlByClientC";
import AuthGraphQlQueryByFetch from "../_components/auth-graphqlComonents/AuthGraphQlQueryByFetch";
import AuthGraphQlQueryInServerComponent from "../_components/auth-graphqlComonents/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "../_components/auth-graphqlComonents/AuthGrphqlByClientComponent";
import SignUpByGraphQLServer from "../_components/auth-graphqlComonents/SignUpByGraphQLServer";
import { useGetAllUser } from "~/hooks/auth-graphqlHooks/useGetAllUser";

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
