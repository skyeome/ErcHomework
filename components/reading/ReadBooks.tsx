import { useAuth } from "@/app/context/auth";
import { useQuery } from "@tanstack/react-query";
import { getReadingBooks } from "@/api/reading";
import { Reading } from "@/libs/firestore";
import ReadBooksNone from "./ReadBooksNone";
import { HStack } from "../ui/hstack";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { Image } from "../ui/image";
import { VStack } from "../ui/vstack";

const ReadBooks = () => {
  const { user } = useAuth();
  const { data, isFetched } = useQuery({
    queryKey: ["reading", "list"],
    queryFn: () => getReadingBooks(user?.uid ?? null),
  });

  const uniqueBooks: Reading[] | undefined = data?.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.title === obj.title),
  );

  if (isFetched && data?.length === 0) return <ReadBooksNone />;

  // 책장 선반을 3개로 나누어 표시
  const booksPerShelf = 3;
  const shelves = [];
  for (let i = 0; i < (uniqueBooks?.length ?? 0); i += booksPerShelf) {
    shelves.push(uniqueBooks?.slice(i, i + booksPerShelf));
  }

  return (
    <VStack className="flex-1 bg-background-0 py-4">
      {shelves.map((shelf, shelfIndex) => (
        <Box key={shelfIndex} className="">
          {/* 책들 */}
          <HStack space="md" className="relative top-2 z-10 justify-between">
            {shelf?.map((book) => (
              <Box
                key={book.id}
                className="relative flex h-[110px] w-[31%] items-center"
              >
                <Box className="h-[110px] w-[70px] overflow-hidden bg-background-300 shadow-md">
                  {book.images?.[0]?.imageUrl ? (
                    <Image
                      source={{ uri: book.images[0].imageUrl }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="px-1 py-3 text-center text-sm font-medium text-white">
                      {book.title}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </HStack>
          {/* 선반 */}
          <Box className="h-4 bg-background-100" />
          <Box className="h-4 bg-background-200" />
        </Box>
      ))}
    </VStack>
  );
};

export default ReadBooks;
