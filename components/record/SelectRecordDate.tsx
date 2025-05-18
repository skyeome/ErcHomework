import { Alert, Platform, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useDateStore } from "@/store/useDateStore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

const SelectRecordDate = () => {
  const isIOS = Platform.OS === "ios";
  const { date, setDate } = useDateStore();
  const [show, setShow] = useState(false);

  const onDateChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      // 주말(토요일: 6, 일요일: 0)인 경우 선택하지 않음
      const day = selectedDate.getDay();
      if (day === 0 || day === 6) {
        console.log("Weekend selected, showing alert");
        Alert.alert("알림", "주말은 선택할 수 없습니다.", [
          { text: "확인", onPress: () => setShow(isIOS) },
        ]);
        return;
      }

      setDate(selectedDate);

      // iOS에서는 여기서 setShow를 처리
      if (Platform.OS === "ios") {
        setShow(false);
      }
    }
  };

  const handlePress = (currentMode: "date" | "time") => {
    setShow(isIOS);
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  return (
    <View>
      <Box className="flex-row items-center justify-between bg-white px-4 py-2 dark:bg-background-50">
        <Text className="text-lg font-medium text-gray-900 dark:text-gray-50">
          날짜 선택
        </Text>
        <Button
          onPress={() => handlePress("date")}
          className="flex-row items-center rounded-lg bg-gray-100 px-4 py-2 dark:bg-background-200"
        >
          <Text className="text-base text-gray-700 dark:text-gray-100">
            {format(date, "yyyy년 MM월 dd일", { locale: ko })}
          </Text>
        </Button>
      </Box>
      {show && (
        <DateTimePicker value={date} mode="date" onChange={onDateChange} />
      )}
    </View>
  );
};
export default SelectRecordDate;
