import axios from "axios";
import Constants from "expo-constants";

// 환경 변수 접근
const requiredEnvVars = {
  NAVER_API_BASE_URL: Constants.expoConfig?.extra?.NAVER_BASE_URL,
  NAVER_CLIENT_ID: Constants.expoConfig?.extra?.NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: Constants.expoConfig?.extra?.NAVER_CLIENT_SECRET,
};

// 필수 환경 변수 검증
if (!requiredEnvVars.NAVER_API_BASE_URL) {
  throw new Error("Missing required environment variable: NAVER_BASE_URL");
}
if (!requiredEnvVars.NAVER_CLIENT_ID) {
  throw new Error("Missing required environment variable: NAVER_CLIENT_ID");
}
if (!requiredEnvVars.NAVER_CLIENT_SECRET) {
  throw new Error("Missing required environment variable: NAVER_CLIENT_SECRET");
}

export interface SearchResult {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: BookItem[];
}

export interface BookItem {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

export const bookSearch = axios.create({
  baseURL: requiredEnvVars.NAVER_API_BASE_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "X-Naver-Client-Id": requiredEnvVars.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": requiredEnvVars.NAVER_CLIENT_SECRET,
  },
});

export const getBooks = async (query?: string, start?: number) => {
  if (query === undefined || query === "") return;
  const { data } = await bookSearch.get<SearchResult>("search", {
    params: { query, display: 10, start: start ?? 1 },
  });
  return data;
};
