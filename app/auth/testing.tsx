import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";


export default function Category()
{
  /* This command is used for navigation*/ 
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}> 
      
      {/* Header Container with Title */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MySejahtera</Text>

        {/* Back Button beside Title */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Testing</Text>
      </View>
    </View>
  );
}

/* Below are styles for the each component*/
const styles = StyleSheet.create({
  headerContainer: 
  {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.LightBlue,
    padding: 10,
    borderRadius: 8,
  },
  headerText: 
  {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: 
  {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  backButtonText:
{
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  content: 
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: 
  {
    fontSize: 20,
    fontWeight: "bold",
  },
});