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
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="items-center justify-center p-4">
      {isRecording && (
        <Text className="text-sm text-gray-600 mb-2">
          {formatTime(duration)}
        </Text>
      )}
      <TouchableOpacity
        onPress={onPress}
        className={`w-16 h-16 rounded-full items-center justify-center ${
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
