import { View, Text, TouchableOpacity } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { FontAwesome } from "@expo/vector-icons";

export interface AudioPlayerProps {
  uri: string;
  onDelete: () => void;
}

export const AudioPlayer = ({ uri, onDelete }: AudioPlayerProps) => {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);

  const togglePlayback = async () => {
    if (!player) return;
    const isPlaying = player.currentStatus.playing;
    const didJustFinish = player.currentStatus.didJustFinish;

    if (isPlaying) {
      player.pause();
    } else if (didJustFinish) {
      player.seekTo(0);
      player.play();
    } else {
      player.play();
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="items-center justify-center p-4">
      <View className="flex-row items-center gap-3 space-x-4">
        <TouchableOpacity
          onPress={togglePlayback}
          className="h-12 w-12 items-center justify-center rounded-full bg-blue-500"
        >
          <FontAwesome
            name={
              status.playing ? "pause" : status.didJustFinish ? "play" : "play"
            }
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-700">
              {formatTime(status.currentTime)}
            </Text>
            <Text className="text-sm text-gray-500">
              {formatTime(status.duration)}
            </Text>
          </View>
          <View className="mt-1 h-1 w-full rounded-full bg-gray-200">
            <View
              className="h-full rounded-full bg-blue-500"
              style={{
                width: `${(status.currentTime / (status.duration || 1)) * 100}%`,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={onDelete}
          className="h-12 w-12 items-center justify-center rounded-full bg-red-500"
        >
          <FontAwesome name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
