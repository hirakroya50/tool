import AuthGraphQl from "../_components/AuthGraphQl";
import AuthGraphQl2 from "../_components/AuthGraphQl2";
import AuthGrphqlByClientComponent from "../_components/AuthGrphqlByClientComponent";
import SignUpByGraphQLServer from "../_components/SignUpByGraphQLServer";

const page = () => {
  return (
    <div>
      <AuthGraphQl2 />
      <SignUpByGraphQLServer />
    </div>
  );
};

export default page;
