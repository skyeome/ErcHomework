import { FlatList } from "react-native";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Skeleton, SkeletonText } from "../ui/skeleton";

const SearchBooksSkeleton = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <Box className="border-b border-gray-300 py-4 dark:border-gray-700">
          <HStack space="md">
            <Skeleton variant="sharp" className="h-[110px] w-[70px]" />
            <SkeletonText _lines={4} gap={3} className="h-3" />
          </HStack>
        </Box>
      )}
    />
  );
};

export default SearchBooksSkeleton;
