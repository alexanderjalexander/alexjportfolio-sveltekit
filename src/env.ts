import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  // Database stuff
  HOMELAB_DATABASE_URL: {
    description: 'Primary Homelab Database connection string.'
  },
  NEON_DATABASE_URL: {
    description: 'Neon Database fallback alternative.'
  },

  // CRON Secret
  CRON_SECRET: {
    description: 'CRON secret, used for refreshing data.'
  },

  // Backblaze B2 Environment Variables
  REGION: {
    description: 'Region marker for AWS compatible Backblaze B2 API.'
  },
  GD_BUCKET_NAME: {
    description: 'Graphic Design images Backblaze B2 bucket name.'
  },
  GD_BUCKET_NAME_RESIZE: {
    description: 'Graphic Design resized images Backblaze B2 bucket name'
  },
  WORK_BUCKET_NAME: {
    description: 'Work Experience image Backblaze B2 bucket name'
  },
  RESUME_BUCKET_NAME: {
    description: 'Resume Backblaze B2 bucket name'
  },
  AWS_ACCESS_KEY_ID: {
    description: 'AWS Access Key ID for Backblaze B2 buckets.'
  },
  AWS_SECRET_ACCESS_KEY: {
    description: 'AWS Access Key ID for Backblaze B2 Buckets'
  },

  // YouTube API for Videos Page
  YOUTUBE_API_KEY: {
    description: 'YouTube Data V3 API Key from Google APIs, used on Programming Page.'
  },

  // Uptime API for Programming Page
  UPTIME_API_URL: {
    description: 'Uptime API URL from Gatus'
  },

  // Contact Information
  EMAIL_ADDRESS: {
    description: 'Contact email address, visible on footer.'
  }
});
