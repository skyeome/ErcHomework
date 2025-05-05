import { Stack } from "expo-router";

export default function WorkbookLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Workbook",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: "New Workbook",
        }}
      />
    </Stack>
  );
}
