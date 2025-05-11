// 녹음 기능 구현을 위한 컴포넌트 및 라이브러리 임포트
import SelectRecordDate from "@/components/record/SelectRecordDate";
import { RecordButton } from "@/components/record/RecordButton";
import { AudioPlayer } from "@/components/record/AudioPlayer";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import WeeklyRecord from "@/components/record/WeeklyRecord";
import RecordComplete from "@/components/record/RecordComplete";

export default function Record() {
  // 녹음 상태 관리를 위한 상태 변수들
  const [recording, setRecording] = useState<Audio.Recording | null>(null); // 현재 녹음 객체
  const [recordedUri, setRecordedUri] = useState<string | null>(null); // 녹음 파일 URI
  const [duration, setDuration] = useState(0); // 녹음 시간(초)

  // 녹음 시간 업데이트를 위한 인터벌 관리
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (recording) {
      // 1초마다 duration 상태 업데이트
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    // 컴포넌트 언마운트 또는 recording 상태 변경 시 인터벌 정리
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recording]);

  // 녹음 시작/정지 버튼 핸들러
  const handleRecordPress = async () => {
    if (recording) {
      // 녹음 중인 경우: 녹음 중지 및 파일 URI 저장
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri);
        setRecording(null);
      } catch (err) {
        console.error("Failed to stop recording", err);
      }
    } else {
      // 녹음 시작 전: 권한 요청 및 녹음 설정
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // 실제 녹음 시작
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
      {/* 날짜 선택 컴포넌트 */}
      <SelectRecordDate />
      <View className="flex-1 items-center justify-center">
        {/* 녹음 상태에 따른 UI 조건부 렌더링 */}
        {!recording && !recordedUri ? (
          // 초기 상태: 녹음 시작 버튼
          <RecordButton
            isRecording={false}
            duration={0}
            onPress={handleRecordPress}
          />
        ) : recording ? (
          // 녹음 중 상태: 녹음 중지 버튼
          <RecordButton
            isRecording={true}
            duration={duration}
            onPress={handleRecordPress}
          />
        ) : recordedUri ? (
          // 녹음 완료 상태: 오디오 플레이어
          <RecordComplete uri={recordedUri} onDelete={handleDelete} />
        ) : null}
      </View>
      {/* 주간 기록 목록 표시 */}
      <WeeklyRecord />
    </View>
  );
}
