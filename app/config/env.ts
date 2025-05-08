// Environment variables configuration
export const ENV = {
  // Naver API Configuration
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID || "",
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET || "",
  NAVER_BASE_URL: process.env.NAVER_BASE_URL || "https://openapi.naver.com",
  SOME_CODE: process.env.SOME_CODE || "",
  // Add other environment variables here
};

// Type for environment variables
export type EnvConfig = typeof ENV;

// Helper function to get environment variable
export const getEnvVar = (key: keyof EnvConfig): string => {
  return ENV[key];
};
