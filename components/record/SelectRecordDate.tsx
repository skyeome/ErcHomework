import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDateStore } from "@/store/useDateStore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const SelectRecordDate = () => {
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
    <View className="flex-row items-center justify-between px-4 py-2 bg-white">
      <Text className="text-lg font-medium text-gray-900">날짜 선택</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="flex-row items-center px-4 py-2 bg-gray-100 rounded-lg"
      >
        <Text className="text-base text-gray-700">
          {format(date, "yyyy년 MM월 dd일", { locale: ko })}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={prevWeek}
          maximumDate={now}
          locale="ko-KR"
        />
      )}
    </View>
  );
};
export default SelectRecordDate;
