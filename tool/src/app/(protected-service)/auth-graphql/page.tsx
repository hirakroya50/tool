import AuthGraphQlQueryByFetch from "../_components/AuthGraphQlQueryByFetch";
import AuthGraphQlQueryInServerComponent from "../_components/AuthGraphQlQueryInServerComponent";
import AuthGrphqlByClientComponent from "../_components/AuthGrphqlByClientComponent";
import FetchUserInGraphQlByClientC from "../_components/FetchUserInGraphQlByClientC";
import SignUpByGraphQLServer from "../_components/SignUpByGraphQLServer";

const page = () => {
  return (
    <div>
      <AuthGraphQlQueryInServerComponent />
      <FetchUserInGraphQlByClientC />
      <SignUpByGraphQLServer />
    </div>
  );
};

export default page;
