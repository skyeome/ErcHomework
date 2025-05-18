import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ReadBooksNone = () => {
  return (
    <View className="flex-1 flex-col justify-center">
      <Text className="text-center text-lg font-bold">
        제출한 숙제가 없습니다.
      </Text>
      <View className="flex-row justify-center">
        <Ionicons name="search" size={20} color="black" />
        <Text>버튼을 눌러 책을 검색 하시거나</Text>
      </View>
      <Text className="text-center">직접 입력해서 숙제를 제출해주세요</Text>
    </View>
  );
};

export default ReadBooksNone;
