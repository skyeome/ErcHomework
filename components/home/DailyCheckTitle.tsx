import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React from "react";

const DailyCheckTitle = () => {
  return (
    <Box className="w-full flex-row bg-stone-200 py-3 dark:bg-stone-900">
      <Text className="w-[12%] whitespace-nowrap text-center text-sm font-bold tracking-tighter">
        Day
      </Text>
      <Text className="w-[22%] whitespace-nowrap text-center text-sm font-bold tracking-tighter">
        RECORD
      </Text>
      <Text className="w-[22%] whitespace-nowrap text-center text-sm font-bold tracking-tighter">
        READING
      </Text>
      <Text className="w-[22%] whitespace-nowrap text-center text-sm font-bold tracking-tighter">
        WORKBOOK
      </Text>
      <Text className="w-[22%] whitespace-nowrap text-center text-sm font-bold tracking-tighter">
        CHECK
      </Text>
    </Box>
  );
};

export default DailyCheckTitle;
