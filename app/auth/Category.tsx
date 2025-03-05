import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const categoryOptions = [
  {
    name: "Covid-19 Status",
    banner: require("../../assets/images/Covid19_Status.jpg"),
    path: "/tabs/Event",
  },
  {
    name: "Helpdesk",
    banner: require("../../assets/images/Helpdesk.jpg"),
    path: "/tabs/Event",
  },
  {
    name: "Health Facilities",
    banner: require("../../assets/images/Healthcare-Facilities.jpg"),
    path: "/tabs/Event",
  },
  {
    name: "MyVoting",
    banner: require("../../assets/images/Voting.png"),
    path: "/auth/MyVoting",
  },
];

export default function Category() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Header Container with Back Button and Title */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MySejahtera</Text>

        {/* Back Button beside Title */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categoryOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(item.path)}>
            <View>
              <Image source={item.banner} style={styles.bannerImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.LightBlue,
    padding: 10,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  bannerImage: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
});