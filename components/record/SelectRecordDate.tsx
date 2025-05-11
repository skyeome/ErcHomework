import { Alert, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDateStore } from "@/store/useDateStore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

const SelectRecordDate = () => {
  const isIOS = Platform.OS === "ios";
  const now = new Date();
  const prevWeek = new Date();
  prevWeek.setDate(prevWeek.getDate() - 7);
  const { date, setDate } = useDateStore();
  const [show, setShow] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      // 주말(토요일: 6, 일요일: 0)인 경우 선택하지 않음
      const day = selectedDate.getDay();
      if (day === 0 || day === 6) {
        Alert.alert("알림", "주말은 선택할 수 없습니다.", [
          { text: "확인", onPress: () => setShow(true) },
        ]);
        return;
      }
      setDate(selectedDate);
    }
  };

  return (
    <React.Fragment>
      <Box className="flex-row items-center justify-between bg-white px-4 py-2 dark:bg-background-50">
        <Text className="text-lg font-medium text-gray-900 dark:text-gray-50">
          날짜 선택
        </Text>
        <Button
          onPress={() => setShow(true)}
          className="flex-row items-center rounded-lg bg-gray-100 px-4 py-2 dark:bg-background-200"
        >
          <Text className="text-base text-gray-700 dark:text-gray-100">
            {format(date, "yyyy년 MM월 dd일", { locale: ko })}
          </Text>
        </Button>
      </Box>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={isIOS ? "inline" : "default"}
          onChange={onDateChange}
          minimumDate={prevWeek}
          maximumDate={now}
          locale="ko-KR"
        />
      )}
    </React.Fragment>
  );
};
export default SelectRecordDate;
