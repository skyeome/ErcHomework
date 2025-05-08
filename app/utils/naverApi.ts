import { getEnvVar } from "../config/env";

// Naver API configuration
const NAVER_API_CONFIG = {
  clientId: getEnvVar("NAVER_CLIENT_ID"),
  clientSecret: getEnvVar("NAVER_CLIENT_SECRET"),
  baseUrl: getEnvVar("NAVER_BASE_URL"),
};

// Naver API call function
export const callNaverApi = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Naver-Client-Id": NAVER_API_CONFIG.clientId,
    "X-Naver-Client-Secret": NAVER_API_CONFIG.clientSecret,
    ...options.headers,
  };

  try {
    const response = await fetch(`${NAVER_API_CONFIG.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Naver API call failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Naver API call error:", error);
    throw error;
  }
};
