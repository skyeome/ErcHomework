import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import DailyCheckTitle from "@/components/home/DailyCheckTitle";
export default function Home() {
  return (
    <Center className="flex-1 bg-background-50">
      <VStack space="xl" className="flex-1 w-full">
        <DailyCheckTitle />
      </VStack>
    </Center>
  );
}
