import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const OpenPackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("OpenPack")}
    >
      <Text style={styles.buttonText}>Open a pack</Text>
    </TouchableOpacity>
  );
};

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
