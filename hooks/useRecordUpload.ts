import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";
import { getThisWeekRecord, uploadRecord } from "@/api/record";
import { setNotification } from "@/api/admin";
import { Alert } from "react-native";
import { useAuth } from "@/app/context/auth";
import { useUserStore } from "@/store/useUserStore";
import { useDateStore } from "@/store/useDateStore";

interface RecordUploadData {
  type: string;
  recordingUri?: string;
  setRecordingUri: (uri: string | undefined) => void;
}

function useRecordUpload({
  type,
  recordingUri,
  setRecordingUri,
}: RecordUploadData) {
  let recordUrl: string | undefined;
  const { user: authUser } = useAuth();
  const { user } = useUserStore();
  const { date } = useDateStore();
  const [isUploading, setIsUploading] = useState(false);
  const { refetch } = useQuery({
    queryKey: ["record", "weekly"],
    queryFn: () => getThisWeekRecord(authUser?.uid ?? null),
  });
  const selectedDate = date === undefined ? new Date() : date;
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const timeStr = format(selectedDate, "HH:mm:ss");

  const handleClickAgain = () => {
    setRecordingUri(undefined);
  };

  const handleRecordUpload = async () => {
    let recordRef: string | undefined;

    // 사용자가 로그인 되어있고 파일이 있으면 업로드
    if (authUser?.uid && user?.name && recordingUri) {
      recordRef = `${type}/${authUser.uid}/${dateStr}/${
        user.name + "_" + timeStr
      }-record.m4a`;

      try {
        const fileRef = ref(storage, recordRef);
        const response = await fetch(recordingUri);
        const blob = await response.blob();
        await uploadBytes(fileRef, blob);
        recordUrl = await getDownloadURL(fileRef);
        handleClickAgain();

        return {
          recordRef,
          recordUrl,
        };
      } catch (error) {
        console.error("Error uploading recording:", error);
        throw error;
      }
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    // 사용자가 로그인 되어있고 파일이 있으면 업로드
    if (authUser?.uid && user?.name && user.level && recordingUri) {
      const recordRef = `${type}/${authUser.uid}/${dateStr}/${
        user.name + "_" + timeStr
      }-record.m4a`;

      try {
        const fileRef = ref(storage, recordRef);
        const response = await fetch(recordingUri);
        const blob = await response.blob();

        // 파일 업로드 및 다운로드 url 생성
        await uploadBytes(fileRef, blob);
        recordUrl = await getDownloadURL(fileRef);

        // db에 url과 파일이름 저장
        const id = await uploadRecord({
          type,
          uid: authUser.uid,
          name: user.name,
          level: user.level,
          createdAt: date === undefined ? new Date() : date,
          recordRef,
          recordUrl,
        });

        // 알림에 기록 저장
        await setNotification(id, type, user.name, user.level, date);
        Alert.alert("숙제 제출", "숙제를 제출했습니다.");
        handleClickAgain();
        refetch();
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error.code, error.message);
        }
        Alert.alert("숙제 제출중에 문제가 발생했습니다.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return {
    isUploading,
    handleClickAgain,
    handleSubmit,
    handleRecordUpload,
  };
}

export default useRecordUpload;
