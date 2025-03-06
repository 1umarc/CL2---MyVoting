import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ethers } from "ethers";

const candidates = [
  { id: 0, name: "Chong Chun Kit", image: require("../../assets/images/Anwar.jpg") },
  { id: 1, name: "Luven Mark", image: require("../../assets/images/Mahatir.jpg") },
  { id: 2, name: "Lim Jia Yuan", image: require("../../assets/images/Ismail.jpeg") },
  { id: 3, name: "Chan Xiao Wen", image: require("../../assets/images/Najib.jpeg") },
];

export default function MyVoting() 
{
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [userWallet, setUserWallet] = useState<ethers.Signer | null>(null);

  // Connect to MetaMask and load the smart contract
  useEffect(() => 
    {
    const init = async () => 
      {
      if (typeof window !== "undefined" && window.ethereum) 
        {
        try 
        {
          // Connect to MetaMask
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          setUserWallet(signer);

          // Details of smart contract 
          const contractAddress = "0x96C47533D2561A0Ef8Ef8EfC676119A6F4aC5693";
          const abi = [
            {
              inputs: [
                { 
                  internalType: "uint256", name: "cInd", type: "uint256" 
                }
              ],
              name: "vote",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                { 
                  internalType: "uint256", name: "", type: "uint256" 
                }
              ],
              name: "candidates",
              outputs: [
                { 
                  internalType: "string", name: "name", type: "string" 
                },

                { 
                  internalType: "uint256", name: "votes", type: "uint256" 
                },

              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { 
                  internalType: "address", name: "", type: "address" 
                }
              ],
              name: "voted",
              outputs: [
                { 
                  internalType: "bool", name: "", type: "bool" 
                }
              ],
              stateMutability: "view",
              type: "function",
            },
          ];

          // Load the contract with the user's wallet
          const votingContract = new ethers.Contract(contractAddress, abi, signer);
          setContract(votingContract);
        } catch (err) {
          console.error("MetaMask connection error:", err);
        }
      } else 
      {
        Alert.alert("MetaMask is required!", "Install MetaMask to vote.");
      }
    };

    init();
  }, []);

  // Function to handle the voting process
  const handleVote = async () => 
    {
    try 
    {
      if (selectedCandidate === null) 
        {
        setError("Please select a candidate to vote.");
        return;
      }
      if (!contract || !userWallet) 
        {
        setError("Voting system is not initialized.");
        return;
      }

      const userAddress = await userWallet.getAddress();
      const hasVoted = await contract.voted(userAddress);

      // Check if the user has already voted
      if (hasVoted) 
        {
        setError("You have already voted.");
        return;
      }

      const tx = await contract.vote(selectedCandidate);
      await tx.wait();
      setVoted(true);
      setError("");
    } catch (err) 
    {
      setError("Voting failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MyVoting</Text>
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
                selectedCandidate === candidate.id && styles.selectedCandidate,
              ]}
              onPress={() => setSelectedCandidate(candidate.id)}
            >
              <Image source={candidate.image} style={styles.candidateImage} />
              <Text style={styles.candidateText}>{candidate.name}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={handleVote} style={styles.voteButton}>
            <Text style={styles.voteButtonText}>Vote</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    </View>
  );
}

// Voting screen's styles
const styles = StyleSheet.create(
  {
  container: 
  { 
    flex: 1, padding: 20, backgroundColor: "#fff" 
  },
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
    fontSize: 30, fontWeight: "bold", color: "#fff" 
  },

  backButton: 
  { 
    backgroundColor: Colors.PRIMARY, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 
  },

  backButtonText: 
  { 
    fontSize: 16, color: "#fff", fontWeight: "bold" 
  },

  subHeader: 
  { 
    fontSize: 18, textAlign: "center", marginVertical: 10 
  },

  candidateContainer: 
  { 
    flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", padding: 10, marginVertical: 5, borderRadius: 8 
  },

  selectedCandidate: 
  { 
    backgroundColor: Colors.LightBlue 
  },

  candidateImage: 
  { 
    width: 50, height: 50, borderRadius: 25, marginRight: 10 
  },

  candidateText: 
  { 
    fontSize: 18, fontWeight: "bold" 
  },

  voteButton: 
  { 
    marginTop: 20, backgroundColor: Colors.PRIMARY, padding: 15, borderRadius: 8, alignItems: "center" 
  },

  voteButtonText: 
  { 
    fontSize: 18, color: "#fff", fontWeight: "bold" 
  },

  confirmationText: 
  { 
    fontSize: 20, color: "green", textAlign: "center", fontWeight: "bold", marginTop: 50 
  },

  errorText: 
  { 
    color: "red", textAlign: "center", marginTop: 10 
  },

});
