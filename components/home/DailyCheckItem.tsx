import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { DailyCheckItemProps } from "./DailyCheckItem.types";
import { useColorScheme } from "react-native";

const checkImage = (data?: boolean) => {
  if (data === undefined) return <Box className="h-8" />;
  return data ? (
    <Image
      source={require("@/assets/images/o.webp")}
      width={30}
      height={30}
      style={{ width: 30, height: 30 }}
      resizeMode="contain"
    />
  ) : (
    <Image
      source={require("@/assets/images/x.webp")}
      width={30}
      height={30}
      style={{ width: 30, height: 30 }}
      resizeMode="contain"
    />
  );
};

function DailyCheckItem({ data, date }: DailyCheckItemProps) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Box className="flex-row items-center py-3">
      <Box className="w-[12%]">
        <Text className="text-center text-sm">{date}</Text>
      </Box>
      <Box className="w-[22%] flex-row justify-center">
        {checkImage(data.record)}
      </Box>
      <Box className="w-[22%] flex-row justify-center">
        {checkImage(data.reading)}
      </Box>
      <Box className="w-[22%] flex-row justify-center">
        {checkImage(data.workbook)}
      </Box>
      <Box className="w-[22%] flex-row justify-center">
        {data.checked && (
          <Ionicons name="checkmark-circle" size={30} color={iconColor} />
        )}
      </Box>
    </Box>
  );
}

export default DailyCheckItem;
