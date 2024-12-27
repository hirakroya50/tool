"use client";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FormInput } from "~/app/(auth-pages)/login/_components/FormInput";
import { PasswordInput } from "~/app/(auth-pages)/login/_components/PasswordButton";
import { type LoginFormInputs } from "~/types";
const CREATE_USER_MUTATION = gql`
  mutation SignUp(
    $email: String!
    $username: String!
    $mobile: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      mobile: $mobile
      password: $password
    ) {
      id
      email
      username
      createdAt
    }
  }
`;

const SignUpByGraphQLServer = () => {
  const [signUp, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>(); // Pass the form type

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // mutate(data);
    console.log(data);

    try {
      const response = await signUp({
        variables: data,
      });
      console.log("Response:", response);
    } catch (error) {
      console.log("error is comming ..........", error);
    }
  };

  console.log({ data });

  return (
    <div>
      <div className="my-3 flex items-center justify-center bg-gray-100 dark:bg-dark-background">
        <div className="my-3 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-card">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-700 dark:text-dark-textPrimary">
            SignUp
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormInput
              errors={errors}
              id="email"
              label="Email"
              register={register}
              type="email"
              placeholder="user email"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              }}
            />
            <FormInput
              errors={errors}
              id="username"
              label="username"
              register={register}
              type="text"
              placeholder="username"
              validation={{
                required: "username is required",
              }}
            />
            <FormInput
              errors={errors}
              id="mobile"
              label="Mobile"
              register={register}
              type="text"
              placeholder="mobile email"
              validation={{
                required: "mobile is required",
              }}
            />

            <PasswordInput errors={errors} register={register} />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:hover:bg-dark-border"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpByGraphQLServer;
