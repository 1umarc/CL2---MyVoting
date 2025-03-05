import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const candidates = [
  {
    id: 1,
    name: "Chong Chun Kit",
    image: require("../../assets/images/Anwar.jpg"),
  },
  {
    id: 2,
    name: "Luven Mark",
    image: require("../../assets/images/Mahatir.jpg"),
  },
  {
    id: 3,
    name: "Lim Jia Yuan",
    image: require("../../assets/images/Ismail.jpeg"),
  },
  {
    id: 4,
    name: "Chan Xiao Wen",
    image: require("../../assets/images/Najib.jpeg"),
  },
];

export default function MyVoting() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (!selectedCandidate) {
      Alert.alert("Error", "Please select a candidate before voting.");
      return;
    }

    setVoted(true);
    Alert.alert("Voting Completed", `You have voted for ${selectedCandidate.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MyVoting</Text>

        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {voted ? (
        <Text style={styles.confirmationText}>✅ Voting Completed! Thank you for your vote.</Text>
      ) : (
        <View>
          <Text style={styles.subHeader}>Cast your vote to help shape the future of MALAYSIA</Text>

          {candidates.map((candidate) => (
            <TouchableOpacity
              key={candidate.id}
              style={[
                styles.candidateContainer,
                selectedCandidate?.id === candidate.id && styles.selectedCandidate,
              ]}
              onPress={() => setSelectedCandidate(candidate)}
            >
              <Image source={candidate.image} style={styles.candidateImage} />
              <Text style={styles.candidateText}>{candidate.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Vote Button */}
          <TouchableOpacity onPress={handleVote} style={styles.voteButton}>
            <Text style={styles.voteButtonText}>Vote</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
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
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  candidateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  selectedCandidate: {
    backgroundColor: Colors.LightBlue,
  },
  candidateImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  candidateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  voteButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  voteButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  confirmationText: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
  },
});
