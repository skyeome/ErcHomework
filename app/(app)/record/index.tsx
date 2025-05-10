import SelectRecordDate from "@/components/record/SelectRecordDate";
import { RecordButton } from "@/components/record/RecordButton";
import { AudioPlayer } from "@/components/record/AudioPlayer";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import WeeklyRecord from "@/components/record/WeeklyRecord";

export default function Record() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (recording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recording]);

  const handleRecordPress = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri);
        setRecording(null);
      } catch (err) {
        console.error("Failed to stop recording", err);
      }
    } else {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setDuration(0);
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }
  };

  const handleDelete = () => {
    setRecordedUri(null);
  };

  return (
    <View className="flex-1 w-full">
      <SelectRecordDate />
      <View className="flex-1 items-center justify-center">
        {!recording && !recordedUri ? (
          <RecordButton
            isRecording={false}
            duration={0}
            onPress={handleRecordPress}
          />
        ) : recording ? (
          <RecordButton
            isRecording={true}
            duration={duration}
            onPress={handleRecordPress}
          />
        ) : recordedUri ? (
          <AudioPlayer uri={recordedUri} onDelete={handleDelete} />
        ) : null}
      </View>
      <WeeklyRecord />
    </View>
  );
}
