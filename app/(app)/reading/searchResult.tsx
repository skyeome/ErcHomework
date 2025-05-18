import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { FlatList } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { getBooks } from "@/api/search";
import { Box } from "@/components/ui/box";
import ReadBooksItem from "@/components/reading/SearchBooksItem";
import SearchBooksSkeleton from "@/components/reading/SearchBooksSkeleton";
import SearchBooksNone from "@/components/reading/SearchBooksNone";

type RouteParams = {
  searchTerm: string;
};

const SearchResult = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { searchTerm } = route.params as RouteParams;

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", searchTerm],
    queryFn: async ({ pageParam }) => {
      const data = await getBooks(searchTerm, pageParam);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.total >= lastPage.start
        ? lastPage.start + 10
        : undefined,
  });
  const bookItems = data?.pages
    .map((page) => page?.items)
    .flat()
    .filter((item) => item !== undefined);

  const handleReachEnd = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Search Result of "${searchTerm}" `,
    });
  }, [navigation]);

  if (isLoading || data === undefined)
    return (
      <Box className="p-4">
        <SearchBooksSkeleton />
      </Box>
    );

  if (!bookItems || bookItems.length === 0) return <SearchBooksNone />;

  return (
    <Box className="p-4">
      {bookItems && (
        <FlatList
          data={bookItems}
          keyExtractor={(item) => item.link}
          onEndReached={handleReachEnd}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <ReadBooksItem item={item} />}
        />
      )}
    </Box>
  );
};

export default SearchResult;
