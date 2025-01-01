import React from "react";
import S3ListItemWithDeleteButton from "./S3ListItemWithDeleteButton";
import { type ApolloError } from "@apollo/client";
import { Loader } from "lucide-react";

type ContentProps = {
  setSelectDataKey: React.Dispatch<
    React.SetStateAction<{
      slNo: number;
      fileKey: string;
    } | null>
  >;
  data: string[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
};

const Content: React.FC<ContentProps> = ({
  setSelectDataKey,
  data,
  error,
  loading,
  refetch,
}) => {
  if (loading)
    return (
      <p className="flex justify-center gap-2 pt-20 text-center text-blue-500">
        <Loader className="animate-spin" />
        <span>Loading List...</span>
      </p>
    );
  if (error)
    return (
      <p className="pt-20 text-center text-red-500">Error loading files!</p>
    );

  return (
    <>
      <p className="text-center text-xs text-blue-400">
        Note: click object key to open
      </p>
      <div className="h-[calc(100vh-18rem)] space-y-2 overflow-auto rounded border bg-white p-2 shadow-md">
        {data?.length > 0 ? (
          data?.map((s3key: string, i: number) => (
            <S3ListItemWithDeleteButton
              key={i}
              s3key={s3key}
              refetch={refetch}
              setSelectDataKey={setSelectDataKey}
              slNo={i}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No files found</p>
        )}
      </div>
    </>
  );
};

const S3KeyList: React.FC<ContentProps> = ({
  setSelectDataKey,
  data,
  error,
  loading,
  refetch,
}) => {
  return (
    <div className="p-2">
      <h2 className="text-center text-lg font-bold underline">
        S3 object Key List
      </h2>

      <Content
        data={data}
        loading={loading}
        refetch={refetch}
        error={error}
        setSelectDataKey={setSelectDataKey}
      />
    </div>
  );
};

export default S3KeyList;
