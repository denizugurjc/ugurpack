import { useInventory } from "@/context/InventoryContext";
import { getRandomCard } from "@/data/cards";
import { subscribeToShake } from "@/lib/shakeDetector";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export default function OpenPackScreen() {
  const { addCard } = useInventory();
  const [currentCard, setCurrentCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToShake(() => {
      if (!loading) openPack();
    });
    return unsubscribe;
  }, [loading]);

  const openPack = async () => {
    setLoading(true);
    setCurrentCard(null);

    const card = await getRandomCard();
    addCard(card);
    setCurrentCard(card);
    setLoading(false);
  };

  const handleGesture = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (Math.abs(translationX) > 80 && !loading) {
        openPack();
      }
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleGesture}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Shake your device or swipe to open a pack!
        </Text>
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {currentCard && (
          <View style={styles.card}>
            <Image source={currentCard.image} style={styles.image} />
            <Text style={styles.name}>{currentCard.name}</Text>
            <Text style={styles.description}>{currentCard.description}</Text>
          </View>
        )}
        {!currentCard && !loading && (
          <View style={styles.closedPackContainer}>
            <Image
              source={require("@/assets/images/pokemon-pack.png")}
              style={styles.closedPackImage}
            />
          </View>
        )}
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    backgroundColor: "#222",
    borderRadius: 12,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  closedPackContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  closedPackImage: {
    width: 350,
    height: 400,
    resizeMode: "contain",
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
  },
  rarity: {
    fontSize: 14,
    color: "#aaa",
  },
});
