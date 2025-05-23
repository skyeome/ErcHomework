import { Stack } from "expo-router";

export default function WorkbookLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Workbook List",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerShown: true,
          title: "New Workbook",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
