import { Stack } from "expo-router";
import { ErrorBoundary } from "expo-router";

export default function PageLayout() {
  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="record"
          options={{
            title: "Record",
          }}
        />
        <Stack.Screen
          name="reading"
          options={{
            title: "Reading",
          }}
        />
        <Stack.Screen
          name="workbook"
          options={{
            title: "Workbook",
          }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
