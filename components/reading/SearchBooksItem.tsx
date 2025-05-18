import { useRouter } from "expo-router";
import { format } from "date-fns";
import { BookItem } from "@/api/search";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { Button, ButtonGroup, ButtonIcon, ButtonText } from "../ui/button";
import { VStack } from "../ui/vstack";
import { AddIcon } from "../ui/icon";

type SearchBooksItemProps = {
  item?: BookItem;
};

const SearchBooksItem = ({ item }: SearchBooksItemProps) => {
  const router = useRouter();
  const handlePressNew = () => {
    router.push({
      pathname: "/(app)/reading/new",
      params: {
        title: item?.title,
        image: item?.image,
      },
    });
  };

  return (
    <Box className="border-b border-gray-300 py-4 dark:border-gray-700">
      <HStack space="md" className="items-center">
        <Box className="h-[110px] w-[70px] bg-background-100">
          {item?.image && (
            <Image
              source={{ uri: item?.image }}
              width={70}
              height={110}
              alt={item?.title}
              className="h-[110px] w-[70px]"
            />
          )}
        </Box>
        <VStack className="h-full flex-1" space="sm">
          <Text numberOfLines={2} ellipsizeMode="tail" size="sm">
            {item?.title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" size="xs">
            {item?.author}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" size="xs">
            {item?.publisher}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" size="xs">
            {item?.pubdate
              ? format(
                  new Date(
                    item.pubdate.slice(0, 4) +
                      "-" +
                      item.pubdate.slice(4, 6) +
                      "-" +
                      item.pubdate.slice(6, 8),
                  ),
                  "yyyy년 MM월 dd일",
                )
              : ""}
          </Text>
        </VStack>
        <ButtonGroup>
          <Button variant="link" onPress={handlePressNew}>
            <ButtonIcon as={AddIcon} />
            <ButtonText>Add</ButtonText>
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};

export default SearchBooksItem;
