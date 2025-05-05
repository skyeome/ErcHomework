import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React from "react";

const DailyCheckTitle = () => {
  return (
    <Box className="w-full flex-row">
      <Text className="w-[12%] text-center tracking-tighter whitespace-nowrap">
        Day
      </Text>
      <Text className="w-[22%] text-center tracking-tighter whitespace-nowrap">
        RECORD
      </Text>
      <Text className="w-[22%] text-center tracking-tighter whitespace-nowrap">
        READING
      </Text>
      <Text className="w-[22%] text-center tracking-tighter whitespace-nowrap">
        WORKBOOK
      </Text>
      <Text className="w-[22%] text-center tracking-tighter whitespace-nowrap">
        CHECK
      </Text>
    </Box>
  );
};

export default DailyCheckTitle;
