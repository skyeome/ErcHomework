import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";

interface AudioPlayerProps {
  uri: string;
  onDelete: () => void;
}

export const AudioPlayer = ({ uri, onDelete }: AudioPlayerProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri]);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="items-center justify-center p-4">
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity
          onPress={togglePlayback}
          className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center"
        >
          <FontAwesome
            name={isPlaying ? "pause" : "play"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-sm text-gray-600">
            {formatTime(position)} / {formatTime(duration || 0)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onDelete}
          className="w-12 h-12 rounded-full bg-red-500 items-center justify-center"
        >
          <FontAwesome name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
