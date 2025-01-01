"use client";
import FetchUserInGraphQlByClientC from "../_components/auth-graphqlComonents/FetchUserInGraphQlByClientC";
import AuthGraphQlQueryByFetch from "../_components/auth-graphqlComonents/AuthGraphQlQueryByFetch";
import AuthGraphQlQueryInServerComponent from "../_components/auth-graphqlComonents/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "../_components/auth-graphqlComonents/AuthGrphqlByClientComponent";
import SignUpByGraphQLServer from "../_components/auth-graphqlComonents/SignUpByGraphQLServer";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query {
    users {
      id
      email
      username
      createdAt
      mobile
    }
  }
`;

type UsersQueryResponse = {
  users: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    mobile: string;
  }[];
};

const Page = () => {
  const { data, loading, refetch } = useQuery<UsersQueryResponse>(query);

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
