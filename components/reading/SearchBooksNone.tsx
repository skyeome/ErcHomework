// import { Ionicons } from "@expo/vector-icons";
import { Box } from "../ui/box";
import { Text } from "../ui/text";

const SearchBooksNone = () => {
  return (
    <Box className="flex-1 flex-col justify-center">
      <Text className="text-center text-lg font-bold">
        검색 결과가 없습니다.
      </Text>
      <Text className="text-center">검색어를 다시 확인해주세요</Text>
    </Box>
  );
};

export default SearchBooksNone;
