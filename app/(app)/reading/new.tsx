import React from "react";
import { Dimensions, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
// import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HStack } from "@/components/ui/hstack";
import UploadBar from "@/components/reading/UploadBar";

type RouteParams = {
  type: string;
  title?: string;
  image?: string;
  onlyPicture?: boolean;
};

const New = () => {
  const theme = useColorScheme();
  const route = useRoute();
  const { type, title, image } = route.params as RouteParams;
  const { width } = Dimensions.get("window");

  return (
    <VStack className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
      >
        <FormControl className="p-4">
          <Heading className="text-typography-900">
            Enter Your Homework Information
          </Heading>
          {image && (
            <Box
              className="my-6 w-full"
              style={{ height: (width - 32) * 1.57 }}
            >
              <Image
                source={{ uri: image }}
                className="h-full w-full object-cover"
                alt={title}
              />
            </Box>
          )}
          <Box className="mb-8">
            <Text className="text-typography-500">Title</Text>
            <Input className="min-w-[250px]">
              <InputField type="text" value={title} />
            </Input>
          </Box>
          <Box className="mb-8">
            <HStack className="items-center justify-center">
              <MaterialIcons
                name="image"
                size={24}
                color={theme === "dark" ? "white" : "black"}
                className="mr-1"
              />
              <Text className="text-center text-typography-500">
                사진 아이콘이나
              </Text>
              <MaterialIcons
                name="mic"
                size={24}
                color={theme === "dark" ? "white" : "black"}
              />
              <Text className="text-center text-typography-500">
                녹음 아이콘을 눌러
              </Text>
            </HStack>
            <Text className="text-center text-typography-500">
              숙제를 올려 주세요.
            </Text>
          </Box>
          <VStack space="xs">
            <Button className="w-full" variant="outline">
              <ButtonText className="text-typography-900">
                Upload Again
              </ButtonText>
            </Button>
            <Button className="w-full">
              <ButtonText className="text-typography-0">
                Submit Homework
              </ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </ScrollView>
      <UploadBar />
    </VStack>
  );
};

export default New;
