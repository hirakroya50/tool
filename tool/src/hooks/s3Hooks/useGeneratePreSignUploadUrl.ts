import type React from "react";
import toast from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";
import { fileFormats } from "~/staticData/fileFormats";
interface GetUploadUrlResult {
  getUploadUrl: string;
}

interface GetUploadUrlVariables {
  format: string;
  contentType: string | undefined;
}

const UPLOAD_MUTATION_FOR_UPLOAD_URL = gql`
  mutation GetUploadUrl($format: String!, $contentType: String!) {
    getUploadUrl(format: $format, contentType: $contentType)
  }
`;
const useGeneratePreSignUploadUrl = ({
  selectedFormat,
  setUploadUrl,
}: {
  selectedFormat: string;
  setUploadUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [uploadFileUrl, { loading, error }] = useMutation<
    GetUploadUrlResult,
    GetUploadUrlVariables
  >(UPLOAD_MUTATION_FOR_UPLOAD_URL);

  const handleGenerateUrl = async () => {
    if (!selectedFormat) return;

    const contentType = fileFormats?.find(
      (format) => format.format === selectedFormat,
    )?.contentType;

    try {
      const result = await uploadFileUrl({
        variables: {
          format: selectedFormat,
          contentType,
        },
      });

      if (result?.data?.getUploadUrl) {
        toast.success("Successfully generating upload URL");
        setUploadUrl(result.data.getUploadUrl); // Safely typed now
      } else {
        throw new Error("Upload URL is missing from the response");
      }
    } catch (err) {
      toast.error(" Error generating upload URL!");

      console.error("Error generating upload URL:", err);
    }
  };

  return { handleGenerateUrl, loading, error, setUploadUrl };
};

export default useGeneratePreSignUploadUrl;