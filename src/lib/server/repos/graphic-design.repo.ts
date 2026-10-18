import { GD_BUCKET_NAME, GD_BUCKET_NAME_RESIZE } from '$app/env/private';

import { getS3Client } from '../blob';

import { GetObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';

const s3 = getS3Client();

export async function listGraphicDesignObjects() {
  const command = new ListObjectsCommand({
    Bucket: GD_BUCKET_NAME!
  });
  const { Contents } = await s3.send(command);
  for (const x of Contents!) {
    ['LastModified', 'ETag', 'StorageClass', 'Owner', 'ChecksumAlgorithm', 'ChecksumType'].forEach(
      // @ts-expect-error TS is just being annoying about deleting keys here
      (e) => delete x[e]
    );
  }
  return Contents;
}

export async function listGraphicDesignResizedObjects() {
  const command = new ListObjectsCommand({
    Bucket: `${GD_BUCKET_NAME_RESIZE!}`
  });
  const { Contents } = await s3.send(command);
  for (const x of Contents!) {
    ['LastModified', 'ETag', 'StorageClass', 'Owner', 'ChecksumAlgorithm', 'ChecksumType'].forEach(
      // @ts-expect-error TS is just being annoying about deleting keys here
      (e) => delete x[e]
    );
  }
  return Contents;
}

export async function getGraphicDesignObject(key: string) {
  const command = new GetObjectCommand({
    Bucket: GD_BUCKET_NAME!,
    Key: key
  });
  const data = await s3.send(command);
  return data;
}

export async function getGraphicDesignResizedObject(key: string) {
  const command = new GetObjectCommand({
    Bucket: `${GD_BUCKET_NAME_RESIZE!}`,
    Key: key
  });
  const data = await s3.send(command);
  return data;
}
