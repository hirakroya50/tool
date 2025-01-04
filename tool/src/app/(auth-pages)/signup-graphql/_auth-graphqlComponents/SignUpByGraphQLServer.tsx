"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "~/app/(auth-pages)/login/_components/FormInput";
import { PasswordInput } from "~/app/(auth-pages)/login/_components/PasswordButton";
import { useSignUpOrCreateUser } from "~/hooks/signup-graphqlHooks/useSignUpOrCreateUser";
import { type LoginFormInputs } from "~/types";
import { UpdateUser } from "./UpdateUser";

const SignUpByGraphQLServer = ({
  refetchUserList,
}: {
  refetchUserList: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>(); // Pass the form type

  const { error, loading, onSubmit } = useSignUpOrCreateUser({
    refetchUserList,
  });

  return (
    <div className="my-3 flex items-center justify-center bg-gray-100 dark:bg-dark-background">
      <div className="my-3 flex w-full items-center justify-center gap-2 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[50%]" noValidate>
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-700 dark:text-dark-textPrimary">
            SignUp
          </h2>
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
            {loading ? "Loading..." : "Sign-up"}
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <UpdateUser refetchUserList={refetchUserList} />
      </div>
    </div>
  );
};

export default SignUpByGraphQLServer;
