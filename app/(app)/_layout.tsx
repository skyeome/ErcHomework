import { Tabs } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#007AFF",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666" : "#999",
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "Record",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="microphone" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reading"
        options={{
          title: "Reading",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workbook"
        options={{
          title: "Workbook",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="pencil" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
