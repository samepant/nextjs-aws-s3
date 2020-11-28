import aws from 'aws-sdk';

const s3 = new aws.S3({
  params: { Bucket: process.env.BUCKET_NAME },
  region: process.env.REGION,
  signatureVersion: 'v4',
});

export default async function (req, res) {
  try {
    const s3Res = await s3.listObjectsV2({}).promise();
    console.log(s3Res)
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}