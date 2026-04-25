import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Bell, List, Settings, User, WalletCards, House } from "lucide-react-native";

import type { TabBarRouteName } from "./TabBar";

type TabBarButtonProps = {
  tabName: TabBarRouteName;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  activeColor: string;
  inactiveColor: string;
};

const ICON_SIZE = 26;
const STROKE = 2;

export function TabBarButton({
  tabName,
  isFocused,
  onPress,
  onLongPress,
  activeColor,
  inactiveColor,
}: TabBarButtonProps) {
  const color = isFocused ? activeColor : inactiveColor;

  const icon = (() => {
    switch (tabName) {
      case "Home":
        return (
          <House
            size={ICON_SIZE}
            color={color}
            strokeWidth={STROKE}
          />
        );
      case "Wallet":
        return (
          <WalletCards
            size={ICON_SIZE}
            color={color}
            strokeWidth={STROKE}
          />
        );
      case "Activity":
        return (
          <List size={ICON_SIZE} color={color} strokeWidth={STROKE} />
        );
      case "Notifications":
        return (
          <Bell size={ICON_SIZE} color={color} strokeWidth={STROKE} />
        );
      case "Profile":
        return <User size={ICON_SIZE} color={color} strokeWidth={STROKE} />;
      case "Settings":
        return <Settings size={ICON_SIZE} color={color} strokeWidth={STROKE} />;
      default:
        return null;
    }
  })();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.hit}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
});
