import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { InventoryProvider } from "@/context/InventoryContext";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <InventoryProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Inventory" />
      </Tabs>
    </InventoryProvider>
  );
}
