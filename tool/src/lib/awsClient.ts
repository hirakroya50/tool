// awsClient.js
"use client";
import { S3 } from "@aws-sdk/client-s3";
if (
  !process.env.NEXT_PUBLIC_AWS_REGION ||
  !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
  !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
) {
  throw new Error("AWS environment variables are not properly set");
}

const s3 = new S3({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
