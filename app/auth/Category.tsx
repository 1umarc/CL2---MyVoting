import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

/*Below are the options for each category with its name, banner image and path */
const categoryOptions = [
  {
    name: "Covid-19 Status",
    banner: require("../../assets/images/Covid19_Status.jpg"),
    path: "/auth/testing", 
  },
  {
    name: "Helpdesk",
    banner: require("../../assets/images/Helpdesk.jpg"),
    path: "/auth/testing",
  },
  {
    name: "Health Facilities",
    banner: require("../../assets/images/Healthcare-Facilities.jpg"),
    path: "/auth/testing",
  },
  {
    name: "MyVoting",
    banner: require("../../assets/images/Voting.png"),
    path: "/auth/MyVoting",
  },
];

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

      {/* Function below is taking categoryOptions as list data and loop through each item in the array.
      Then for each item, it renders a TouchableOpacity , when pressed, navigates to the screen specified by item.path */}
      <FlatList //
        data={categoryOptions} // use categoryOptions as list data
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
  bannerImage: 
  {
    height: 100,
    width: "100%",
    resizeMode: "cover",
  },
  categoryText: 
  {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
});