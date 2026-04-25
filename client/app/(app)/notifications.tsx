import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.root, { backgroundColor: c.background.primary }]}>
      <Text style={[styles.title, { color: c.text.primary }]}>
        Notifications
      </Text>
      <Text style={[styles.sub, { color: c.text.secondary }]}>
        Placeholder — alerts and messages go here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 59,
  },
  title: {
    fontSize: 22,
    fontFamily: "generalSemiBold",
    letterSpacing: -0.5,
  },
  sub: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "generalRegular",
  },
});
