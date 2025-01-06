import { useForm } from "react-hook-form";
import { useUpdateUser } from "~/hooks/signup-graphqlHooks/useUpdateUser";

type UpdateUserFormInputs = {
  id: string;
  username: string;
  mobile: string;
};

export const UpdateUser = ({
  refetchUserList,
}: {
  refetchUserList: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormInputs>();

  const { errorForUpdate, loadingFroUpdate, handelUpdate } = useUpdateUser({
    refetchUserList,
  });

  const onSubmit = async (data: UpdateUserFormInputs) => {
    await handelUpdate(data);
  };

  return (
    <div className="my-3 flex items-center justify-center dark:bg-dark-background">
      <div className="my-3 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-card">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700 dark:text-dark-textPrimary">
          Update User
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            {...register("id", { required: "User ID is required" })}
            type="text"
            placeholder="User ID"
            className="mb-3 w-full rounded border border-gray-300 p-2"
          />
          {errors.id && <p className="text-red-500">{errors.id.message}</p>}

          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
            className="mb-3 w-full rounded border border-gray-300 p-2"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <input
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            })}
            type="text"
            placeholder="Mobile Number"
            className="mb-3 w-full rounded border border-gray-300 p-2"
          />
          {errors.mobile && (
            <p className="text-red-500">{errors.mobile.message}</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:hover:bg-dark-border"
          >
            {loadingFroUpdate ? "Updating..." : "Update"}
          </button>
          {errorForUpdate && (
            <p className="mt-2 text-red-500">{errorForUpdate.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};
