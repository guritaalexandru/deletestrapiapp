module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('IAM_USER_ACCESS_KEY'),
        secretAccessKey: env('IAM_USER_SECRET_KEY'),
        region: env('S3_BUCKET_REGION'),
        params: {
          Bucket: env('S3_BUCKET_NAME'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
