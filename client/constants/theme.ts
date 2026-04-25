/**
 * App color system — aligned with Lenme borrow / home UI (Figma Test Page targets).
 * When the Figma MCP can access your file, you can paste variable hex values here to stay in sync.
 * @see https://www.figma.com/design/t22NzlP0EVAyQFXxYJbItA/Test-Page
 */

import { Theme, ThemeFonts } from "@/types/Theme";
import { Platform } from "react-native";

// ─── Core palette ────────────────────────────────────────────────────────────

export const Colors = {
  light: {
    // Backgrounds
    background: {
      /** Full-screen canvas behind cards (e.g. home scroll) */
      screen: "#F5F5F5",
      /** Default app / card surface */
      primary: "#FFFFFF",
      /** Inputs, subtle panels */
      surface: "#F7F7F7",
    },
    /** Lenme brand — headers, gauges, game banner */
    brand: {
      primary: "#7B61FF",
      onPrimary: "#FFFFFF",
      pressed: "#6545E6",
    },
    /** Product accents (links, promos, CTAs) */
    accent: {
      success: "#1B9E4D",
      highlight: "#FFD84D",
      destructive: "#E53935",
    },
    /** Borrow flow specifics */
    borrow: {
      gaugeTrack: "#E0E0E0",
      cryptoSwitchTrack: "#E8E8E8",
      cryptoGradientStart: "#A9A9A9",
      cryptoGradientEnd: "#FFFFFF",
      cryptoRowFallback: "#F0F0F0",
    },
    // Borders & dividers
    border: {
      default: "#E5E5E5",
      subtle: "#E8E8E8",
    },
    // Text
    text: {
      primary: "#1A1A1A",
      secondary: "#808080",
      link: "#1A1A1A",
    },
    // Interactive states
    interactive: {
      disabled: "#CCCCCC",
      disabledText: "#FFFFFF",
    },
    // Primary CTA button (solid black pill, etc.)
    button: {
      primaryBg: "#1A1A1A",
      primaryText: "#FFFFFF",
    },
    // Icons (eye, chevron, etc.)
    icon: {
      default: "#333333",
    },
  },

  dark: {
    background: {
      screen: "#141414",
      primary: "#141414",
      surface: "#1F1F1F",
    },
    brand: {
      primary: "#A78BFA",
      onPrimary: "#FFFFFF",
      pressed: "#9580E8",
    },
    accent: {
      success: "#4ADE80",
      highlight: "#FFD84D",
      destructive: "#EF5350",
    },
    borrow: {
      gaugeTrack: "#4A4A4A",
      cryptoSwitchTrack: "#3D3D3D",
      cryptoGradientStart: "#5C5C5C",
      cryptoGradientEnd: "#2A2A2A",
      cryptoRowFallback: "#2A2A2A",
    },
    border: {
      default: "#2E2E2E",
      subtle: "#2E2E2E",
    },
    text: {
      primary: "#F0F0F0",
      secondary: "#7A7A7A",
      link: "#E0E0E0",
    },
    interactive: {
      disabled: "#2E2E2E",
      disabledText: "#606060",
    },
    button: {
      primaryBg: "#F0F0F0",
      primaryText: "#141414",
    },
    icon: {
      default: "#C0C0C0",
    },
  },
};

export const AppFonts: ThemeFonts = {
  regular: {
    fontFamily: Platform.select({
      ios: "generalRegular",
      android: "generalRegular",
      default: "sans-serif",
    }),
    fontWeight: "400",
  },
  medium: {
    fontFamily: Platform.select({
      ios: "generalMedium",
      android: "generalMedium",
      default: "sans-serif-medium",
    }),
    fontWeight: "500",
  },
  bold: {
    fontFamily: Platform.select({
      ios: "generalSemiBold",
      android: "generalSemiBold",
      default: "sans-serif",
    }),
    fontWeight: "600",
  },
  heavy: {
    fontFamily: Platform.select({
      ios: "generalSemiBold",
      android: "generalSemiBold",
      default: "sans-serif",
    }),
    fontWeight: "700",
  },
};

// ─── Navigation themes (React Navigation / Expo Router) ──────────────────────

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.light.brand.primary,
    background: Colors.light.background.primary,
    card: Colors.light.background.surface,
    text: Colors.light.text.primary,
    border: Colors.light.border.default,
    notification: "rgb(255, 59, 48)",
  },
  fonts: AppFonts,
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.brand.primary,
    background: Colors.dark.background.primary,
    card: Colors.dark.background.surface,
    text: Colors.dark.text.primary,
    border: Colors.dark.border.default,
    notification: "rgb(255, 69, 58)",
  },
  fonts: AppFonts,
};

// ─── Tab bar (legacy — kept for backward compat) ─────────────────────────────

export const TabColors = {
  light: {
    icon: Colors.light.icon.default,
    tabIconDefault: Colors.light.text.secondary,
    tabIconSelected: Colors.light.text.primary,
  },
  dark: {
    icon: Colors.dark.icon.default,
    tabIconDefault: Colors.dark.text.secondary,
    tabIconSelected: Colors.dark.text.primary,
  },
};

// ─── Fonts ───────────────────────────────────────────────────────────────────

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
