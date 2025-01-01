import { Download, Loader } from "lucide-react";
import { Button } from "~/components/ui/button";
import useDownloadFile from "~/hooks/s3Hooks/useDownloadFile";

const S3ObjectDownloadButton = ({ fileKey }: { fileKey: string }) => {
  const { downloadStatus, handleDownload } = useDownloadFile(fileKey);

  return (
    <>
      {downloadStatus && (
        <div className="fixed top-32 flex gap-2 rounded-md bg-green-500 p-2 px-3 text-white opacity-80">
          {" "}
          <Loader className="animate-spin" />
          <span>
            Hold on. It&apos;s converting to blob then starting the download
          </span>{" "}
        </div>
      )}
      <Button
        onClick={handleDownload}
        className="mt-2 flex gap-1 rounded text-white shadow"
      >
        <Download />
        <span>Download File</span>{" "}
      </Button>
    </>
  );
};

export default S3ObjectDownloadButton;
