import { Stack } from "expo-router";

export default function ReadingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Reading",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Search Books",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: "New Reading",
        }}
      />
      <Stack.Screen
        name="[title]"
        options={{
          title: "Book Detail",
        }}
      />
    </Stack>
  );
}
