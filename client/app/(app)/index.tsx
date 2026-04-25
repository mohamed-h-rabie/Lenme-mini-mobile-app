import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";
import { ScrollView, StyleSheet } from "react-native";
import { BorrowAmountSection } from "@/components/borrow/BorrowAmountSection";
import { BorrowHomeMidSections } from "@/components/borrow/BorrowHomeMidSections";

export default function HomeScreen() {
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;

  return (
    <ScrollView
      style={[
        styles.scroll,
        {
          backgroundColor: theme.dark ? c.background.surface : c.background.screen,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BorrowAmountSection />
      <BorrowHomeMidSections />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 10,
    flexGrow: 1,
  },
});
