import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export default async function s3Uploading(file, targetDir) {
  if (file.size > 1024 * 1024 * 15) {
    const e = new Error("File is too big");
    e.name = "FileToBig";
    throw e;
  }
  if (!file.type.includes("image/")) {
    const e = new Error("Not an image");
    e.name = "NotAnImage";
    throw e;
  }
  try {
    const data = s3.upload(
      {
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: targetDir,
        Body: file,
      },
      (error, data) => {
        if (error) {
        }
        if (data) {
        }
      }
    );

    return data;
  } catch {}
}
