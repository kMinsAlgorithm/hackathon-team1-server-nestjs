import { registerAs } from '@nestjs/config';

export default registerAs('files', () => ({
  awsAccessKey: process.env.AWS_S3_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_S3_REGION,
  awsS3Bucket: process.env.AWS_S3_BUCKET,
}));
