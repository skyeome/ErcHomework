import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface RecordButtonProps {
  isRecording: boolean;
  duration: number;
  onPress: () => void;
}

export const RecordButton = ({
  isRecording,
  duration,
  onPress,
}: RecordButtonProps) => {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="items-center justify-center p-4">
      {isRecording && (
        <Text className="mb-2 text-sm text-gray-600">
          {formatTime(duration)}
        </Text>
      )}
      <TouchableOpacity
        onPress={onPress}
        className={`h-16 w-16 items-center justify-center rounded-full ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        <FontAwesome
          name={isRecording ? "stop" : "microphone"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
