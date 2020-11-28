import aws from 'aws-sdk';

const s3 = new aws.S3({
  params: { Bucket: process.env.BUCKET_NAME },
  region: process.env.REGION,
  signatureVersion: 'v4',
});

export default async function handler(req, res) {
  try {
    const post = await s3.createPresignedPost({
      Fields: {
        key:  `${process.env.S3_FOLDER}/${req.query.file}`,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 104857600], // up to 100 MB
      ],
    });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500)
  }
}
