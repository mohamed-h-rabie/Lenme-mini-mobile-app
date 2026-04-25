import { StyleSheet, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabBarButton } from "./TabBarButton";
import React from "react";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";

/** Bottom nav order — matches Figma: Home, wallet, list, notifications */
export const TAB_BAR_ROUTE_ORDER = [
  "Home",
  "Wallet",
  "Activity",
  "Notifications",
  "Profile",
  "Settings",
] as const;

export type TabBarRouteName = (typeof TAB_BAR_ROUTE_ORDER)[number];

export default function TabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;

  const activeColor = theme.dark ? c.text.primary : "#000000";
  const inactiveColor = theme.dark ? c.text.secondary : "#BDBDBD";

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: c.background.primary,
          borderTopColor: c.border.default,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View style={styles.row}>
        {TAB_BAR_ROUTE_ORDER.map((name) => {
          const route = state.routes.find((r) => r.name === name);
          if (!route) return null;

          const isFocused = state.routes[state.index]?.name === name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={name}
              tabName={name}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingTop: 12,
    minHeight: 75,
  },
});
