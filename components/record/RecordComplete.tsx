import { View, Text } from "react-native";
import React from "react";
import { AudioPlayer, AudioPlayerProps } from "./AudioPlayer";
import { Button } from "../ui/button";

interface RecordCompleteProps extends AudioPlayerProps {
  handleSubmit: () => Promise<void>;
}

const RecordComplete = ({
  uri,
  onDelete,
  handleSubmit,
}: RecordCompleteProps) => {
  return (
    <View className="w-full flex-1 justify-between pt-3">
      <AudioPlayer uri={uri} onDelete={onDelete} />
      <View className="px-4">
        <Button className="" onPress={handleSubmit}>
          <Text className="text-white dark:text-black">Submit Homework</Text>
        </Button>
      </View>
    </View>
  );
};

export default RecordComplete;
