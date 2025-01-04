import React from "react";

import { Loader, Trash2 } from "lucide-react";
import { useDeleteFileOnS3 } from "~/hooks/s3Hooks/useDeleteFileOnS3";
interface S3ListItemWithDeleteButtonProps {
  refetch: () => void;
  s3key: string;
  setSelectDataKey: React.Dispatch<
    React.SetStateAction<{ slNo: number; fileKey: string } | null>
  >;
  slNo: number;
}
const S3ListItemWithDeleteButton: React.FC<S3ListItemWithDeleteButtonProps> = ({
  refetch,
  s3key,
  setSelectDataKey,
  slNo,
}) => {
  const { error, handleDelete, loading } = useDeleteFileOnS3({ refetch });
  return (
    <>
      <div className="flex items-center justify-between rounded border p-1 hover:bg-gray-100">
        <span
          title="click to open it "
          className="cursor-pointer rounded-md border p-1 font-mono text-sm hover:bg-blue-500"
          onClick={() => setSelectDataKey({ fileKey: s3key, slNo })}
        >
          No:{slNo + 1}, {s3key}
        </span>
        <button
          onClick={() => handleDelete(s3key)}
          className="rounded border p-0.5"
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <Trash2 className="text-red-700" />
          )}
        </button>
      </div>
      <span>{error && <>{error.message}</>}</span>
    </>
  );
};

export default S3ListItemWithDeleteButton;
