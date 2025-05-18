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
          title: "Reading Homework",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: true,
          title: "Book Search",
        }}
      />
      <Stack.Screen
        name="searchResult"
        options={{
          headerShown: true,
          title: "Book Search Result",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerShown: true,
          title: "New Reading Homework",
        }}
      />
    </Stack>
  );
}
