import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import DailyCheckTitle from "@/components/home/DailyCheckTitle";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <Center className="flex-1 bg-background-50">
        <VStack space="xl" className="flex-1 w-full">
          <DailyCheckTitle />
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
