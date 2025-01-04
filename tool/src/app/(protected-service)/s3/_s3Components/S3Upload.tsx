import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useGeneratePreSignUploadUrl from "~/hooks/s3Hooks/useGeneratePreSignUploadUrl";
import useS3ObjectUploadBySignUrl from "~/hooks/s3Hooks/useS3ObjectUploadBySignUrl";
import { Button } from "~/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "~/components/ui/input";
import { fileFormats } from "~/staticData/fileFormats";

const S3Upload = ({ refetch }: { refetch: () => void }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadingSate, setUploadingState] = useState<boolean>(false);

  //generate a pre sign url
  const { error, handleGenerateUrl, loading } = useGeneratePreSignUploadUrl({
    selectedFormat,
    setUploadUrl,
  });

  //upload the selected file by the url
  const { handleUpload } = useS3ObjectUploadBySignUrl({
    file,
    refetch,
    setUploadingState,
    setUploadUrl,
    uploadUrl,
  });

  return (
    <div className="border-b border-blue-500 p-2">
      <div className="rounded-lg border bg-yellow-50 p-2 shadow-md">
        <h3 className="mb-2 text-center text-lg font-bold text-yellow-800 underline">
          Upload File to s3
        </h3>

        <div className="mb-2">
          <Select onValueChange={(val) => setSelectedFormat(val)}>
            <SelectTrigger className="border-yellow-600">
              <SelectValue placeholder="Select file format" />
            </SelectTrigger>
            <SelectContent>
              {fileFormats.map((format) => (
                <SelectItem key={format.format} value={format.format}>
                  {format.format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerateUrl}
          disabled={!selectedFormat || loading}
          className={`w-full rounded-md p-3 font-semibold text-white ${
            loading || !selectedFormat
              ? "cursor-not-allowed bg-blue-300"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading && <Loader className="animate-spin" />}
          {loading ? "Generating..." : "Generate Upload URL"}
        </Button>
      </div>
      {error && <div className="mt-2 text-red-500">{error.message}</div>}

      {uploadUrl && (
        <div className="mt-1">
          <div className="grid w-full max-w-sm items-center gap-2 rounded-md bg-red-100 p-2 pt-4 shadow-md">
            <Input
              id="s3file"
              type="file"
              className="file:text-black-900 flex w-full items-center border border-yellow-700 p-1 text-sm text-gray-500 file:mt-0.5 file:cursor-pointer file:rounded-md file:border-0 file:bg-blue-200 file:p-0.5 file:px-2 file:text-sm file:font-semibold hover:file:bg-blue-100"
              onChange={(e) => {
                if (e.target.files) {
                  const selectedFile = e.target.files?.[0] ?? null;
                  setFile(selectedFile);
                }
              }}
            />
            <Button
              onClick={handleUpload}
              disabled={!file}
              className="mt-2 bg-green-500 p-2 text-white"
            >
              {uploadingSate && <Loader className="animate-spin" />}
              {uploadingSate ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default S3Upload;
