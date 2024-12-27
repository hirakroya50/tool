"use client";
import AuthGraphQlQueryByFetch from "../_components/AuthGraphQlQueryByFetch";
import AuthGraphQlQueryInServerComponent from "../_components/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "../_components/AuthGrphqlByClientComponent";
import FetchUserInGraphQlByClientC from "../_components/FetchUserInGraphQlByClientC";
import SignUpByGraphQLServer from "../_components/SignUpByGraphQLServer";
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
      <SignUpByGraphQLServer refetchUserList={refetch} />
    </div>
  );
};

export default Page;
