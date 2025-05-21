import { OpenPackButton } from "@/components/ui/OpenPackButton";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to UgurPack</Text>
      <OpenPackButton />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Inventory")}
      >
        <Text style={styles.buttonText}>Inventar anzeigen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4e4efc",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
