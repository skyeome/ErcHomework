import { useQuery } from "@tanstack/react-query";
import { getThisWeekRecord } from "@/api/record";
import { generateWeekDates } from "@/hooks/getWeekDate";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/app/context/auth";

const weekItems = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."];

function WeeklyRecord() {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["record", "weekly"],
    queryFn: () => getThisWeekRecord(user?.uid ?? null),
  });

  // 이번 주 월요일부터 금요일까지의 날짜 배열 생성
  const weekDates = generateWeekDates();

  // 이번 주 월요일부터 금요일까지의 숙제 완료 여부 배열 생성
  const status = weekDates.map((date) => {
    const found = data?.find((homework) => {
      const homeworkDate = homework.date.toDate(); // Firestore에서 가져온 데이터의 날짜
      return homeworkDate.toDateString() === date.toDateString();
    });
    return !!found;
  });

  return (
    <View className="h-20">
      <View className="relative z-10 w-full h-full mx-auto px-6 pt-4 bg-gray-100 dark:bg-gray-800">
        <View className="flex-row justify-between px-3.5">
          {weekItems.map((item) => (
            <Text key={item} className="text-sm">
              {item}
            </Text>
          ))}
        </View>

        <View className="flex-row justify-between mt-1">
          {status.map((item, index) => (
            <View key={index} className="w-8">
              {item ? (
                <Ionicons
                  name="checkmark-circle"
                  size={38}
                  color="#3b82f6"
                  style={{ marginLeft: -3 }}
                />
              ) : (
                <View />
              )}
            </View>
          ))}
        </View>

        <View className="absolute top-10 left-6 -z-10 flex-row justify-between w-full h-8 rounded-full bg-gray-200 dark:bg-gray-700">
          {status.map((item, index) => (
            <View key={index} className={`w-8 h-8 items-center justify-center`}>
              <View
                className={`w-${item ? "7.5" : "2.5"} h-${
                  item ? "7.5" : "2.5"
                } rounded-full bg-white dark:bg-gray-900`}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default WeeklyRecord;
