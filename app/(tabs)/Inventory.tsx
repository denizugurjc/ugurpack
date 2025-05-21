import { OpenPackButton } from "@/components/ui/OpenPackButton";
import { Card, useInventory } from "@/context/InventoryContext";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const getCardStyle = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case "common":
      return {
        backgroundColor: "#2a2a2a",
        borderColor: "#555",
        shadowColor: "#333",
      };
    case "uncommon":
      return {
        backgroundColor: "#234d20",
        borderColor: "#5cb85c",
        shadowColor: "#5cb85c",
      };
    case "rare":
      return {
        backgroundColor: "#1e2e50",
        borderColor: "#4a90e2",
        shadowColor: "#4a90e2",
      };
    case "epic":
      return {
        backgroundColor: "#3a185d",
        borderColor: "#a259ff",
        shadowColor: "#a259ff",
      };
    case "legendary":
      return {
        backgroundColor: "#4a2900",
        borderColor: "#ffc300",
        shadowColor: "#ffc300",
      };
    case "mythic":
      return {
        backgroundColor: "#3a0000",
        borderColor: "#ff3b3b",
        shadowColor: "#ff3b3b",
      };
    default:
      return {
        backgroundColor: "#222",
        borderColor: "#444",
        shadowColor: "#000",
      };
  }
};

export const getRarityTextColor = (rarity: string) => {
  switch (rarity?.toLowerCase()) {
    case "common":
      return "#bbbbbb";
    case "uncommon":
      return "#6fcf97";
    case "rare":
      return "#3498db";
    case "epic":
      return "#c084fc";
    case "legendary":
      return "#f1c40f";
    case "mythic":
      return "#ff4d4d";
    default:
      return "#ccc";
  }
};

export default function InventoryScreen() {
  const { cards } = useInventory();

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (card: Card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  if (cards.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>You have no cards yet 😢</Text>
        <Text style={styles.emptyText}>Open a pack to get you first card!</Text>
        <OpenPackButton />
      </View>
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={styles.list}
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => {
          const style = getCardStyle(item.rarity);
          return (
            <Pressable
              onPress={() => openModal(item)}
              style={[styles.card, styles.shadow, getCardStyle(item.rarity)]}
            >
              <View style={[styles.cardInventory, style]}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.name}>
                  {item.name}{" "}
                  {item.count && item.count > 1 ? `×${item.count}` : ""}
                </Text>
                <Text
                  style={[
                    styles.rarity,
                    { color: getRarityTextColor(item.rarity) },
                  ]}
                >
                  {item.rarity}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              getCardStyle(selectedCard?.rarity || ""),
            ]}
          >
            {selectedCard && (
              <>
                <Text
                  style={[
                    styles.rarityModal,
                    { color: getRarityTextColor(selectedCard.rarity) },
                  ]}
                >
                  {selectedCard.rarity}
                </Text>
                <Image source={selectedCard.image} style={styles.image} />
                <Text style={styles.name}>{selectedCard.name}</Text>
                <Text style={styles.description}>
                  {selectedCard.description || "No description available."}
                </Text>
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  <Text style={{ color: "#fff" }}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e2f",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
    borderWidth: 2,
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    color: "#eee",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  shadow: {
    elevation: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  emptyText: {
    fontSize: 18,
    color: "#ffffff",
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardInventory: {
    flex: 1,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  rarity: {
    color: "#aaa",
  },
  rarityModal: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
