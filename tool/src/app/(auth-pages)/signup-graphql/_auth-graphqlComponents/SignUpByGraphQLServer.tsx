"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "~/app/(auth-pages)/login/_components/FormInput";
import { PasswordInput } from "~/app/(auth-pages)/login/_components/PasswordButton";
import { useSignUpOrCreateUser } from "~/hooks/signup-graphqlHooks/useSignUpOrCreateUser";
import { type LoginFormInputs } from "~/types";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[40%] rounded-2xl border bg-white p-4 py-10 shadow"
      noValidate
    >
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
  );
};

export default SignUpByGraphQLServer;
