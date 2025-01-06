"use client";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import usePostDataOrTrigger from "~/hooks/notificationHook/usePostDataOrTrigger";
import type { AxiosResponse } from "axios";

interface FormData {
  data: string;
}

const PostDataOrTrigger = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { postData, loading, error } = usePostDataOrTrigger();
  const [response, setResponse] = useState<AxiosResponse | undefined>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const res = await postData(formData);
    // reset();
    setResponse(res);
    console.log({ res, data: res?.data });
    console.log({ formData });
  };

  return (
    <div className="flex min-h-screen grow flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Do Some Costly oration and get the nonfiction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="data"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Data
              </label>
              <Input
                id="data"
                type="text"
                {...register("data", { required: "Data is required" })}
                placeholder="Enter some data"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
          {error && <p className="mt-4 text-red-500">{error.message}</p>}
          {response && (
            <div className="mt-4 rounded bg-green-100 p-2 text-green-800">
              <strong>Response:</strong>{" "}
              {JSON.stringify(response?.data?.status)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostDataOrTrigger;
