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
          title: "Reading List",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerShown: true,
          title: "New Reading",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[title]"
        options={{
          headerShown: true,
          title: "Book Detail",
        }}
      />
    </Stack>
  );
}
