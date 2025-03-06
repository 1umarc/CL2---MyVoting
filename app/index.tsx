import React from "react";
import { useRouter } from "expo-router";
import 
{
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";


export default function Home() 
{
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#007AFF" }}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/MySejahtera.jpeg")} // Displays the app logo
          style={styles.logo}
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to</Text> 
        <Text style={styles.appName}>MySejahtera</Text>
        <Text style={styles.description}>
          A safer, healthier Malaysia starts with you.
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/Category")} // Navigates to the Category screen on press
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: 
  {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  logo: 
  {
    width: 220, 
    height: 220, 
    resizeMode: "contain",
  },
  textContainer: 
  {
    alignItems: "center",
    marginBottom: 40, 
  },
  title: 
  {
    fontSize: 28,
    fontWeight: "500",
    color: "#fff",
  },
  appName: 
  {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  description: 
  {
    fontSize: 16,
    color: "#f0f0f0",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 20,
  },
  button: 
  {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
  },
  buttonText: 
  {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
  },
});
