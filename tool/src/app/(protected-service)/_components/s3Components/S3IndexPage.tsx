"use client";
import { useState } from "react";
import S3Display from "./S3Display";
import S3KeyList from "./S3KeyList";
import S3Upload from "./S3Upload";
import useListFilesQuery from "~/hooks/s3Hooks/useListFilesQuery";
interface SelectedFileKey {
  slNo: number;
  fileKey: string;
}

const S3IndexPage = () => {
  const [selectDataKey, setSelectDataKey] = useState<SelectedFileKey | null>(
    null,
  );
  const { data, loading, refetch, error } = useListFilesQuery();

  return (
    <div className="flex min-h-full w-full grow border">
      <section className="w-[30rem] border-r border-red-200">
        <S3Upload refetch={refetch} />
        <S3KeyList
          data={data?.listFiles}
          loading={loading}
          refetch={refetch}
          error={error}
          setSelectDataKey={setSelectDataKey}
        />
      </section>
      <S3Display selectDataKey={selectDataKey} />
    </div>
  );
};

export default S3IndexPage;
