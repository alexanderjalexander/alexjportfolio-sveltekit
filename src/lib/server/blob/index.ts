import { REGION } from '$app/env/private';
import { S3Client } from '@aws-sdk/client-s3';

export function getS3Client(): S3Client {
  return new S3Client({
    endpoint: `https://s3.${REGION}.backblazeb2.com`,
    region: REGION
  });
}
