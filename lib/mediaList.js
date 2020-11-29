import aws from 'aws-sdk';

const s3 = new aws.S3({
  params: { Bucket: process.env.BUCKET_NAME },
  region: process.env.REGION,
  signatureVersion: 'v4',
});

async function getAllKeys(allKeys = []){
  const response = await s3.listObjectsV2({Prefix: process.env.S3_FOLDER}).promise();
  response.Contents.forEach(obj => {
    if (obj.Size > 100) {
      const mediaItem = {
        key: obj.Key,
        modified: obj.LastModified,
        etag: obj.ETag,
      }
      allKeys.push(mediaItem)
    }
  });

  if (response.NextContinuationToken) {
    params.ContinuationToken = response.NextContinuationToken;
    await getAllKeys(params, allKeys); // RECURSIVE CALL
  }
  return allKeys;
}

export async function getMediaList() {
  const media = []
  try {
    const allKeys = await getAllKeys();
    const sortedKeys = allKeys.sort((a, b) => b.modified - a.modified)

    const list = JSON.parse(JSON.stringify(sortedKeys));

    return list;
  } catch (err) {
    console.log(err);
  }
}

