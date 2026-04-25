import React, { useEffect, useId, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  useWindowDimensions,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bitcoin, Gift, Menu } from "lucide-react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { CircularBorrowGauge } from "./CircularBorrowGauge";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";

const CRYPTO_SWITCH = {
  w: 52,
  h: 32,
  thumb: 26,
  pad: 2,
} as const;

const CRYPTO_CHIP = 25;
const CRYPTO_TITLE_LINE = 22;

function CryptoPillSwitch({
  value,
  onValueChange,
  activeColor,
  trackOff,
}: {
  value: boolean;
  onValueChange: (next: boolean) => void;
  activeColor: string;
  trackOff: string;
}) {
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      friction: 9,
      tension: 100,
    }).start();
  }, [value, progress]);

  const travel =
    CRYPTO_SWITCH.w - CRYPTO_SWITCH.pad * 2 - CRYPTO_SWITCH.thumb;
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, travel],
  });

  return (
    <Pressable
      hitSlop={12}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel="Crypto collateral"
      accessibilityHint="Increase borrowing limit when you own crypto"
      onPress={() => onValueChange(!value)}
      style={styles.cryptoPillSwitchHit}
    >
      <View
        style={[
          styles.cryptoPillSwitchTrack,
          { backgroundColor: value ? activeColor : trackOff },
        ]}
      />
      <Animated.View
        style={[
          styles.cryptoPillSwitchThumb,
          { transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
}

export function BorrowAmountSection() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;
  const [crypto, setCrypto] = useState(false);
  const cryptoRowGradientId = `cryptoRowGrad${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const accent = c.brand.primary;
  const cardBg = theme.dark ? c.background.primary : "#FFFFFF";
  const border = theme.dark ? c.border.default : c.border.subtle;

  /** Purple band fills ~50% of viewport (Figma) */
  const purpleBandHeight = Math.round(windowHeight * 0.5);
  /** Card overlaps purple so its top sits just below the BORROW row */
  const headerRowBottom = insets.top + 10 + 48 + 14;
  const cardOverlap = Math.min(
    purpleBandHeight - 28,
    Math.max(120, purpleBandHeight - headerRowBottom),
  );

  return (
    <View
      style={[
        styles.outer,
        { backgroundColor: theme.dark ? c.background.surface : c.background.screen },
      ]}
    >
      <View style={styles.heroStack}>
        <View
          style={[
            styles.purpleBand,
            {
              backgroundColor: accent,
              height: purpleBandHeight,
            },
          ]}
        >
          <View style={[styles.headerRow, { paddingTop: insets.top + 10 }]}>
            <Pressable
              hitSlop={12}
              style={styles.headerIcon}
              accessibilityLabel="Menu"
            >
              <Menu color="#FFFFFF" size={26} strokeWidth={2} />
            </Pressable>
            <Text style={styles.headerTitle}>BORROW</Text>
            <Pressable
              hitSlop={12}
              style={styles.headerIcon}
              accessibilityLabel="Rewards"
            >
              <Gift color="#FFFFFF" size={24} strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              marginTop: -cardOverlap,
              backgroundColor: cardBg,
              borderColor: border,
              ...Platform.select({
                ios: {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.12,
                  shadowRadius: 24,
                },
                android: { elevation: 8 },
              }),
            },
          ]}
        >
          <Text style={[styles.question, { color: c.text.primary }]}>
            How much would you like to borrow?
          </Text>

          <View
            style={[
              styles.cryptoRow,
              {
                backgroundColor: theme.dark
                  ? c.background.surface
                  : "transparent",
                borderColor: theme.dark ? border : "transparent",
              },
            ]}
          >
            {!theme.dark ? (
              <Svg
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
                preserveAspectRatio="none"
              >
                <Defs>
                  <LinearGradient
                    id={cryptoRowGradientId}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                    gradientUnits="objectBoundingBox"
                  >
                    <Stop
                      offset="0"
                      stopColor={c.borrow.cryptoGradientStart}
                      stopOpacity={1}
                    />
                    <Stop
                      offset="1"
                      stopColor={c.borrow.cryptoGradientEnd}
                      stopOpacity={1}
                    />
                  </LinearGradient>
                </Defs>
                <Rect
                  width="100%"
                  height="100%"
                  rx={16}
                  ry={16}
                  fill={`url(#${cryptoRowGradientId})`}
                />
              </Svg>
            ) : null}
            <View style={styles.cryptoContent}>
              <View style={styles.cryptoTextWrap}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <View style={styles.bitcoinChip}>
                    <Bitcoin color="#FFFFFF" size={15} strokeWidth={2.2} />
                  </View>
                  <Text style={[styles.cryptoTitle, { color: c.text.primary }]}>
                    Do you own crypto?
                  </Text>
                </View>

                <Text style={[styles.cryptoSub, { color: c.text.secondary }]}>
                  Increase your limit up to $10,000
                </Text>
              </View>
            </View>
            <View style={styles.cryptoSwitchWrap}>
              <CryptoPillSwitch
                value={crypto}
                onValueChange={setCrypto}
                activeColor={accent}
                trackOff={c.borrow.cryptoSwitchTrack}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 25 }}>
            <CircularBorrowGauge
              min={50}
              max={5000}
              value={2000}
              maxCreditLine={{ leadPurple: "Max", amountMuted: "$200" }}
              accentColor={accent}
              mutedColor={c.text.secondary}
              textPrimary={c.text.primary}
              trackColor={c.borrow.gaugeTrack}
            />
          </View>

          <View style={styles.footerRow}>
            <View style={styles.totalCol}>
              <Text style={[styles.totalLabel, { color: c.text.secondary }]}>
                Total amount
              </Text>
              <Text style={[styles.totalLine, { color: c.text.primary }]}>
                with applicable
                <Text
                  style={{ color: accent, textDecorationLine: "underline" }}
                >
                  fees
                </Text>
                : <Text style={{ fontFamily: "generalSemiBold" }}>$53.11</Text>
              </Text>
            </View>
            <Pressable style={styles.ctaCircle} accessibilityLabel="Continue">
              <Text style={styles.ctaArrow}>→</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingBottom: 8,
  },
  heroStack: {
    position: "relative",
    width: "100%",
    overflow: "visible",
  },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: 3,
    fontFamily: "generalSemiBold",
  },
  purpleBand: {
    width: "100%",
    zIndex: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  card: {
    marginHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 22,
    zIndex: 2,
  },
  question: {
    fontSize: 17,
    fontFamily: "generalMedium",
    marginBottom: 16,
    lineHeight: 24,
  },
  cryptoRow: {
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
    paddingLeft: 14,
    paddingRight: 12,
    marginBottom: 4,
  },
  cryptoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    minWidth: 0,
    paddingRight: 8,
  },
  bitcoinChip: {
    width: CRYPTO_CHIP,
    height: CRYPTO_CHIP,
    borderRadius: CRYPTO_CHIP / 2,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.22)",
  },
  cryptoTextWrap: {
    flex: 1,
    minWidth: 0,
    justifyContent: "flex-start",
  },
  cryptoTitle: {
    fontSize: 16,
    fontFamily: "generalSemiBold",
    lineHeight: CRYPTO_TITLE_LINE,
  },
  cryptoSub: {
    fontSize: 13,
    fontFamily: "generalRegular",
    marginTop: 2,
    lineHeight: 18,
  },
  cryptoSwitchWrap: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  cryptoPillSwitchHit: {
    position: "relative",
    width: CRYPTO_SWITCH.w,
    height: CRYPTO_SWITCH.h,
  },
  cryptoPillSwitchTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CRYPTO_SWITCH.h / 2,
  },
  cryptoPillSwitchThumb: {
    position: "absolute",
    left: CRYPTO_SWITCH.pad,
    top: (CRYPTO_SWITCH.h - CRYPTO_SWITCH.thumb) / 2,
    width: CRYPTO_SWITCH.thumb,
    height: CRYPTO_SWITCH.thumb,
    borderRadius: CRYPTO_SWITCH.thumb / 2,
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.08)",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.14,
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 22,
  },
  totalCol: {
    flex: 1,
    paddingRight: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "generalMedium",
    marginBottom: 4,
  },
  totalLine: {
    fontSize: 14,
    fontFamily: "generalRegular",
    lineHeight: 21,
  },
  ctaCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  ctaArrow: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
});
