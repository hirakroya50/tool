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

export const useGetAllUser = () => {
  const { data, loading, refetch } = useQuery<UsersQueryResponse>(query);

  return { data, loading, refetch };
};
