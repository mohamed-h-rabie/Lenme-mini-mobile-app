import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";

export function BorrowHomeMidSections() {
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;
  const accent = c.brand.primary;
  const cardBg = theme.dark ? c.background.primary : "#FFFFFF";
  const border = theme.dark ? c.border.default : "#E8E8E8";
  const linkGreen = c.accent.success;
  const shadow =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        }
      : { elevation: 3 };

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.card,
          styles.offersCard,
          { backgroundColor: cardBg, borderColor: border },
          shadow,
        ]}
      >
        <View style={styles.offersRow}>
          <View style={styles.giftIconClip} accessibilityElementsHidden>
            <Image
              source={require("@/assets/images/gift.png")}
              style={styles.giftIconImage}
              contentFit="contain"
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={styles.offersTextCol}>
            <Text style={[styles.offersBody, { color: c.text.primary }]}>
              <Text style={styles.offersLead}>New offers! </Text>
              Check out our partner offerings, handpicked to help you save.
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {}}
          style={styles.checkOutWrap}
          accessibilityRole="link"
          accessibilityLabel="Check out partner offers"
        >
          <Text
            style={[
              styles.checkOut,
              { color: linkGreen, textDecorationColor: linkGreen },
            ]}
          >
            Check out
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.card,
          styles.creditCard,
          { backgroundColor: cardBg, borderColor: border },
          shadow,
        ]}
      >
        <Pressable
          style={styles.creditTop}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Your available credit, zero dollars"
        >
          <View style={styles.creditCoinClip}>
            <Image
              source={require("@/assets/images/gold.png")}
              style={styles.creditCoinImage}
              contentFit="cover"
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={styles.creditTextCol}>
            <Text style={[styles.creditLabel, { color: c.text.secondary }]}>
              Your Available Credit
            </Text>
            <Text style={[styles.creditAmount, { color: c.text.primary }]}>
              $0.00
            </Text>
          </View>
          <ChevronRight color={c.text.secondary} size={22} strokeWidth={2} />
        </Pressable>

        <View style={[styles.gameBanner, { backgroundColor: accent }]}>
          <View style={styles.gameArtRow}>
            <Image
              source={require("@/assets/images/img2.png")}
              style={[styles.gameArtImg ]}
              contentFit="contain"
              accessibilityIgnoresInvertColors
            />
            <Image
              source={require("@/assets/images/img1.png")}
              style={styles.gameArtImg}
              contentFit="contain"
              accessibilityIgnoresInvertColors
            />
            <Image
              source={require("@/assets/images/img3.png")}
              style={styles.gameArtImg}
              contentFit="contain"
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={styles.gameFooter}>
            <Text style={styles.gameCopy}>
              Play game and earn credit to use as Lenme credit.
            </Text>
            <Pressable
              style={[styles.earnBtn, { backgroundColor: c.accent.highlight }]}
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="Earn now"
            >
              <Text style={styles.earnBtnText}>Earn Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  creditCard: {
    paddingBottom: 14,
  },
  offersCard: {
    padding: 18,
    borderRadius: 18,
  },
  offersRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 14,
  },
  offersTextCol: {
    flex: 1,
    minWidth: 0,
  },
  giftIconClip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  giftIconImage: {
    width: 55,
    height: 55,
  },
  offersBody: {
    fontSize: 15,
    fontFamily: "generalRegular",
    lineHeight: 22,
  },
  offersLead: {
    fontFamily: "generalSemiBold",
  },
  checkOutWrap: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  checkOut: {
    fontSize: 15,
    fontFamily: "generalSemiBold",
    textDecorationLine: "underline",
  },
  creditTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 14,
  },
  creditCoinClip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  creditCoinImage: {
    width: 44,
    height: 44,
  },
  creditTextCol: {
    flex: 1,
    minWidth: 0,
  },
  creditLabel: {
    fontSize: 13,
    fontFamily: "generalMedium",
    marginBottom: 2,
  },
  creditAmount: {
    fontSize: 28,
    fontFamily: "generalSemiBold",
    letterSpacing: -0.5,
  },
  gameBanner: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    overflow: "hidden",
  },
  gameArtRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 12,
  },
  gameArtImg: {
    flex: 1,
    minWidth: 0,
    height: 86,
    maxWidth: 96,
  },
  gameFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  gameCopy: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "generalMedium",
    lineHeight: 20,
  },
  earnBtn: {
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  earnBtnText: {
    color: "#000000",
    fontSize: 13,
    fontFamily: "generalSemiBold",
    letterSpacing: 0.5,
  },
});
