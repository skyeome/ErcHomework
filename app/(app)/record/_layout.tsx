import { Stack } from "expo-router";

export default function ReadingLayout() {
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
          title: "Record Homework",
        }}
      />
    </Stack>
  );
}
