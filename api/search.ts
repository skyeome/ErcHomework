import axios from "axios";
import dotenv from "dotenv";

// 환경 변수 로드
dotenv.config();

// 환경 변수 검증
const requiredEnvVars = {
  NAVER_BASE_URL: process.env.NAVER_BASE_URL,
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
};

// 필수 환경 변수 검증
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

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
  baseURL: requiredEnvVars.NAVER_BASE_URL,
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
