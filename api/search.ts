import axios from "axios";

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
  baseURL: import.meta.env.PROD ? process.env.NAVER_BASE_URL : "/api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "X-Naver-Client-Id": import.meta.env.DEV
      ? process.env.NAVER_CLIENT_ID
      : undefined,
    "X-Naver-Client-Secret": import.meta.env.DEV
      ? process.env.NAVER_CLIENT_SECRET
      : undefined,
  },
});

export const getBooks = async (query?: string, start?: number) => {
  if (query === undefined || query === "") return;
  const { data } = await bookSearch.get<SearchResult>(
    import.meta.env.PROD ? "search" : "book.json",
    {
      params: { query, display: 10, start: start ?? 1 },
    }
  );
  return data;
};
