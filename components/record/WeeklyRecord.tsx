import { useQuery } from "@tanstack/react-query";
import { useColorScheme } from "@/components/useColorScheme";
import { getThisWeekRecord } from "@/api/record";
import { generateWeekDates } from "@/hooks/getWeekDate";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/app/context/auth";

const weekItems = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."];

function WeeklyRecord() {
  const colorScheme = useColorScheme();
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
      <View className="relative z-10 mx-auto h-full w-full bg-background-50 px-5 pt-4">
        <View className="flex-row justify-between px-3">
          {weekItems.map((item) => (
            <Text key={item} className="text-sm text-black dark:text-white">
              {item}
            </Text>
          ))}
        </View>

        <View className="flex-row justify-between px-2 py-1.5">
          {status.map((item, index) => (
            <View key={index} className="h-7 w-7">
              {item ? (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
              ) : (
                <Ionicons
                  name="ellipse-outline"
                  size={24}
                  color={colorScheme === "dark" ? "#000" : "#fff"}
                />
              )}
            </View>
          ))}
        </View>

        <View className="absolute left-6 top-10 -z-10 h-8 w-full rounded-full bg-background-200" />
      </View>
    </View>
  );
}

export default WeeklyRecord;
