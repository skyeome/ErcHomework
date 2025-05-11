import { useQuery } from "@tanstack/react-query";
import { getWeeklyCheck } from "@/api/home";
import { VStack } from "@/components/ui/vstack";
import DailyCheckTitle from "@/components/home/DailyCheckTitle";
import { View } from "@/components/Themed";
import { useUserStore } from "@/store/useUserStore";
import DailyCheckItem from "@/components/home/DailyCheckItem";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Center } from "@/components/ui/center";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const insets = useSafeAreaInsets();

  const { data } = useQuery({
    queryKey: ["home", user?.uid],
    queryFn: () => {
      return getWeeklyCheck(user?.uid ?? "");
    },
    enabled: !!user?.uid,
  });
  if (!data)
    return (
      <View className="flex-1 items-center justify-center bg-background-50">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  return (
    <Center className="flex-1" style={{ paddingTop: insets.top }}>
      <VStack space="xl" className="h-full w-full flex-1 bg-background-50">
        <DailyCheckTitle />
        <DailyCheckItem data={data.mon} date="Mon." />
        <DailyCheckItem data={data.tue} date="Tue." />
        <DailyCheckItem data={data.wed} date="Wed." />
        <DailyCheckItem data={data.thu} date="Thu." />
        <DailyCheckItem data={data.fri} date="Fri." />
      </VStack>
    </Center>
  );
}
