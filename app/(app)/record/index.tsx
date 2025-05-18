// 녹음 기능 구현을 위한 컴포넌트 및 라이브러리 임포트
import SelectRecordDate from "@/components/record/SelectRecordDate";
import { RecordButton } from "@/components/record/RecordButton";
import { Alert, View } from "react-native";
import { useState } from "react";
import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import WeeklyRecord from "@/components/record/WeeklyRecord";
import RecordComplete from "@/components/record/RecordComplete";
import useRecordUpload from "@/hooks/useRecordUpload";

export default function Record() {
  // 녹음 상태 관리를 위한 상태 변수들
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStatus = useAudioRecorderState(audioRecorder);
  const [recordedUri, setRecordedUri] = useState<string | null>(null); // 녹음 파일 URI
  const [isRecording, setIsRecording] = useState(false);

  const { handleSubmit } = useRecordUpload({
    type: "record",
    recordingUri: recordedUri ?? undefined,
    setRecordingUri: (uri) => setRecordedUri(uri ?? null),
  });

  const handleRecord = async () => {
    // 녹음 시작 전: 권한 요청 및 녹음 설정
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (status.granted) {
        // 실제 녹음 시작
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
        setIsRecording(true);
      } else {
        // 권한이 없을 경우 알림 표시
        Alert.alert("Permission to access microphone was denied");
        return;
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const handleStopRecording = async () => {
    // 녹음 중인 경우: 녹음 중지 및 파일 URI 저장
    try {
      await audioRecorder.stop();
      const { uri } = audioRecorder;
      setRecordedUri(uri);
      setIsRecording(false);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const handleDelete = () => {
    setRecordedUri(null);
  };

  return (
    <View className="w-full flex-1">
      {/* 날짜 선택 컴포넌트 */}
      <SelectRecordDate />
      <View className="flex-1 items-center justify-center">
        {/* 녹음 상태에 따른 UI 조건부 렌더링 */}
        {!recordedUri ? (
          // 초기 상태: 녹음 시작 버튼
          <RecordButton
            isRecording={isRecording}
            duration={recorderStatus.durationMillis / 1000}
            onPress={isRecording ? handleStopRecording : handleRecord}
          />
        ) : (
          // 녹음 완료 상태: 오디오 플레이어
          <RecordComplete
            uri={recordedUri}
            onDelete={handleDelete}
            handleSubmit={handleSubmit}
          />
        )}
      </View>
      {/* 주간 기록 목록 표시 */}
      <WeeklyRecord />
    </View>
  );
}
