import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "./context/auth";

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ERC Homework</Text>

      <View style={styles.menuContainer}>
        <Link href="/reading" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Reading</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/workbook" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Workbook</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/record" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Record</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  menuItem: {
    backgroundColor: "#007AFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
